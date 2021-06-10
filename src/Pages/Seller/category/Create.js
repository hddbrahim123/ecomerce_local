import React, { useEffect, useState } from "react"

//Import toastr
import toastr from "toastr"
import "toastr/build/toastr.min.css"


import { createCategory } from "../../../Core/ApiCore/Category"



const CreateCateory = (props) => {

  const [category, setCategory] = useState({
    "name":"",
    "active":true,
  })

  
  //handle Product
  const handleCategory = e =>  {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    setCategory({...category ,[e.target.id]:value })
  }

  

  //Submit category
  const SubmitCategory = (e)=>{
    e.preventDefault()
    createCategory(category)
      .then(res=>{
        if(res.success){

          toastr.options.progressBar = true
          toastr.success("Category Created SuccessFully","success")
          props.history.push("/seller/categories")
        }else{
          toastr.error(res.message,res.code)
        }
      })
  }


  useEffect(() => {
  }, [])

  return (
    <React.Fragment>
      <div>
      <div className="row">
      <form
        onSubmit={SubmitCategory}
      >
        <div className="col-lg-12">
          <div className="card">
           <div className="card-body">
             <div className="row">
               <div className="col-lg-12">
                 <div className="mb-3">
                   <label htmlFor="name">Name</label>
                   <input
                    id="name"
                    type="text"
                    className="form-control"
                    onChange={handleCategory}
                   />
                 </div>
               </div>
               <div className="col-lg-12">
                <div className="form-check  mb-3" >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="active"
                    onChange={handleCategory}
                    checked={category.active}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="active"
                  >
                    Active
                  </label>
                </div>
               </div>
             </div>
             <div>
               <div xl="12" sm="12">
               <button className="btn btn-primary btn-block" type="submit">Create Category</button>
               </div>
             </div>
           </div>
          </div>
        </div>
      </form>
      </div>
      </div>
    </React.Fragment>
  )
}

export default CreateCateory
