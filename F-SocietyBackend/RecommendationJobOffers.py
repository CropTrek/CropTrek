import sys
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

similarity_threshold = 0.5

# get the command line arguments
jobseeker_users = json.loads(sys.argv[1])
job_data = json.loads(sys.argv[2])

# recommend jobs to each job seeker
job_recommendations = {}
for i, jobseeker in enumerate(jobseeker_users):
    recommended_jobs = []
    jobs_already_added = set()
    search_history = [search['researchChain'] for search in jobseeker['searchHistory']]

    # ignore if search history contains only one word
    if len(search_history) == 1:
        continue

    # concatenate the job descriptions, titles, and search history into a single corpus
    corpus = [job['title'] + ' ' + job['description'] for job in job_data]
    corpus += search_history

    # compute the TF-IDF matrix for the corpus
    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform(corpus)

    # get the search history vector and the job descriptions and titles vectors
    sh_vector = tfidf[-len(search_history):]
    jd_title_vectors = tfidf[:-len(search_history)]

    # compute the similarity between the job titles, descriptions, and search history
    similarity = cosine_similarity(tfidf[:-1], sh_vector).reshape(-1, 1)
    

    for j, job in enumerate(job_data):
        # check if the job title or description contains any word from the jobseeker's search history
        search_history = [search['researchChain'] for search in jobseeker['searchHistory']]
        if len(search_history) == 1:
            continue # ignore if search history contains only one word
        
        for word in search_history:
            if len(word) == 1:
                continue # ignore if search history contains a word with only one character
            
            if word.lower() in job['title'].lower() or word.lower() in job['description'].lower():
                if job['_id'] not in jobs_already_added:
                    recommended_jobs.append((job, similarity[j])) # add job and similarity score
                    jobs_already_added.add(job['_id'])
                break # add job once per search history word match

    # sort recommended jobs by similarity score and job ID
    recommended_jobs_sorted = sorted(recommended_jobs, key=lambda job: (-job[1], job[0]['_id']))
    
    # remove duplicates
    unique_jobs = []
    unique_jobs_titles = set()
    for job, score in recommended_jobs_sorted:
        if job['title'] not in unique_jobs_titles:
            unique_jobs.append(job)
            unique_jobs_titles.add(job['title'])
        elif job['title'] in unique_jobs_titles and score > similarity_threshold:
            for i in range(len(unique_jobs)):
                if unique_jobs[i]['title'] == job['title']:
                    unique_jobs[i] = job
                    break   

    # add the recommended jobs to the job_recommendations dictionary
    job_recommendations[jobseeker['_id']] = unique_jobs

# convert job recommendations to json string and print
job_recommendations_json = json.dumps(job_recommendations)
print(job_recommendations_json)
