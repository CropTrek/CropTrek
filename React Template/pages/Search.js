import React, {useState} from "react";
import {useRouter} from "next/router";

const Search =()=>{
    const router=useRouter()
    const [keyword,setKeyword]=useState()
    const submitHandler=(e)=>{
        e.preventDefault();
        if (keyword && typeof keyword === 'string' && keyword.trim()) {
            router.push(`/Search/${keyword}`)
        }
        else{
            router.push('/')
        }
    }
    return(
        <>
            <div className="product-search-filter wow fadeInUp">
                <form onSubmit={submitHandler}>
                    <div className="row align-items-center">
                        <div className="col-lg-3">
                            <div className="product-search mb-30">
                                <div className="form_group">
                                    <input
                                        type="search"
                                        className="form_control"
                                        placeholder="Search"
                                        name="search"
                                        onChange={(e=>setKeyword(e.target.value))}
                                    />
                                    <button type="submit" className="search-btn">
                                        <i className="far fa-search" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div></form></div>
        </>
    )
}
export default Search;
