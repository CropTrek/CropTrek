import Link from "next/link";
import React from "react";
import { useRouter } from 'next/router';
import { Button } from 'reactstrap';
const AccessDach = () =>{
  const router = useRouter();
  const handleClick = () => {
    router.push('../Auth')
  }
    return(
      
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "20px"}}>
          <img src="https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7899.jpg?w=740&t=st=1678647308~exp=1678647908~hmac=3c7c9b10473276a6194856c0a3a1904b8850b36afc6533013e5d329cd036e8af" style={{ maxWidth: "100%", height: "100%" }} />
          <div style={{ textAlign: "center", marginLeft: "20px" }}>
          <h3 className="title" style={{marginBottom: "10px"}}>Your have no access :( </h3>
          <br></br>
          <br></br>
            <Button className="btn" color="warning" style={{marginRight: "10px"}} onClick={handleClick} >HOME </Button>
          
        
          </div>
        </div>
      )
}


export default AccessDach;