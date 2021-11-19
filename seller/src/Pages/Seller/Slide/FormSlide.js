import React, { useEffect,useState } from "react";

// // Import Editor
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

//Import toastr
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { useDropzone } from "react-dropzone";

import {
  GetSlide,
  InsertSlide,
  UpdateSlide,
  UploadImageSlide,
  GetLastSlideView
} from "../../../Core/ApiCore/ProductSeller";
import { isEmpty } from "lodash";
import ModalConfirmation from '../../../Components/Comon/ModalConfirmation'

import dictionary from "../../../Core/dictionary";
import TextEditor from "../../../Core/TextEditor";
import { API_URL } from "../../../config";

// const thumbsContainer = {
//   display: "flex",
//   flexDirection: "row",
//   flexWrap: "wrap",
//   marginTop: 16,
// };

// const thumb = {
//   display: "inline-flex",
//   borderRadius: 2,
//   border: "1px solid #eaeaea",
//   marginBottom: 8,
//   marginRight: 8,
//   width: 200,
//   height: 200,
//   padding: 4,
//   boxSizing: "border-box",
// };

// const thumbInner = {
//   display: "flex",
//   minWidth: 0,
//   overflow: "hidden",
// };

const FormSlide = (props) => {
  const [language] = useState(
    localStorage.getItem("language") ?? dictionary.defaultLanguage
  );
  const [isOpen, setIsOpen] = useState(false);
  const [slide, setSlide] = useState({
    id:0,
    title: "",
    description: "",
    link: "product/",
    index: 0,
    active: true
  });

  const handleChangeSlide = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSlide({
      ...slide,
      [e.target.id]: value
    })
  };

  const handleChangeDescription = (e) => {
    setSlide({
      ...slide,
      description: e
    });
  };

  //handle Image
  var formData = new FormData();

  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    }
  })

  const submitSlide = (e) => {
    //e.preventDefault();
    // if (!isNumber(slide.index)) {
    //   slide.index = 0
    //   setSlide({
    //     ...slide,
    //     index: 0
    //   })
    // } else {
    //   slide.index = parseInt(slide.index) ?? 0
    //   setSlide({
    //     ...slide,
    //     index: parseInt(slide.index) ?? 0
    //   })
    // }
    
    if (slide.id) {
      UpdateSlide(slide).then(res => {
        if (res.success) {
          if (!isEmpty(files)) {
            files.map((file) => {
              formData.append("photos", file);
            });
            let id = res.data.id;
            UploadImageSlide(id, formData).then((res) => {
              console.log(res);
              toastr.options.progressBar = true;
              toastr.success("Slide modifié avec succès", "");
              //window.location.reload()
            });
          } else {
            toastr.options.progressBar = true;
            toastr.success("Slide modifié avec succès", "");
            window.location.reload()
          }
        } else {
          toastr.error(res.message);
        }
      })
    } else {
      if (isEmpty(files)) {
        toastr.options.progressBar = true;
        toastr.error("Svp, Selectionner un image", "");
      }
      InsertSlide(slide).then((res) => {
        if (res.success) {
          if (!isEmpty(files)) {
            files.map((file) => {
              formData.append("photos", file);
            });
            let id = res.data.id;
            UploadImageSlide(id, formData).then((res) => {
              console.log(res);
              toastr.options.progressBar = true;
              toastr.success(content.saveSlideSuccess, "");
              //props.history.push("/seller/slides");
            });
          }
        } else {
          toastr.error(res.message);
        }
      })
    }
  }

  const urlImage = (image) =>{
    return `${API_URL}User/ImageSlide?image=${image}`;
  }
  var content = dictionary.slide[language];
  
  useEffect(() => {
    let slideid = props.match.params.id;
    if (slideid) {
      GetSlide(slideid).then((res) =>{
        if (res) {
          slide.id = res.id;
          slide.title = res.title;
          slide.description = res.description;
          slide.link = res.link;
          slide.index = res.index
          slide.active = res.active
          
          //setSlide(res);
          setSlide({
            ...slide,
            id:res.id,
            title: res.title,
            description: res.description,
            link: res.link,
            index: res.index,
            active: res.active
          })
          setFiles([res.image])
        }
      })
    } else {
      GetLastSlideView().then((res)=>{
        console.log(res)
        if (res) {
          slide.index = res.index + 1
          setSlide({
            ...slide,
            index: res.index + 1
          })
        }
      })
    }
  }, []);
  return (
    <React.Fragment>
      <ModalConfirmation 
        isOpen={isOpen} 
        toggle={()=>setIsOpen(!isOpen)}
        title={slide.id ? content.titleUpdateSlideConfirmation : content.titleSaveSlideConfirmation}
        message={slide.id ? content.updateSlideMessageConfirmation : content.saveSlideMessageConfirmation}
        buttonTextProcess={content.buttonSaveSlideTextConfirmation}
        buttonTextClose={content.buttonClose} 
        handleProcess={()=>{ submitSlide(); setIsOpen(!isOpen);}} 
      />
      <form onSubmit={(e)=>{ e.preventDefault(); setIsOpen(!isOpen); }}>
        <div className="card">
          <div className="card-body">

          {/* <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="index" className="">
                    {content.labelSlideIndex}
                  </label>
                  <input
                    id="index"
                    type="number"
                    className="form-control"
                    placeholder={content.placeHolderSlideIndex}
                    value={slide.index}
                    onChange={handleChangeSlide}
                  />
                </div>
              </div>
            </div> */}

            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="title" className="">
                    {content.labelSlideTitle}
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="form-control"
                    placeholder={content.placeHolderSlideTitle}
                    value={slide.title}
                    onChange={handleChangeSlide}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    {content.labelSlideDescription}
                  </label>
                  <TextEditor
                    value={slide.description}
                    onChange={(e) => handleChangeDescription(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="link" className="form-label">
                    {content.labelSlideLink}
                  </label>
                  <input
                    id="link"
                    type="text"
                    className="form-control"
                    placeholder={content.placeHolderSlideLink}
                    value={slide.link}
                    onChange={e => handleChangeSlide(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
              <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="active"
                    checked={slide.active}
                    onChange={handleChangeSlide}
                  />
                  <label className="form-check-label" htmlFor="active">
                  Active
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <section className="container">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} multiple={false} />
                <div className="d-flex flex-column align-items-center mt-5 justify-content-center">
                  <div className="mb-3">
                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                  </div>
                  <p className="text-capitalize">{content.labelSlideImage}</p>
                </div>
              </div>
              <div className="card-body thumbsContainer">
                {!isEmpty(files) &&
                  files.map((image, i) => (
                    <div className="thumb" key={i}>
                      <div title={image.filename} className="thumbInner">
                        <img src={image ? image.preview ?? urlImage(image) : urlImage(image)} className="image-slide" />
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <button type="submit" className="btn btn-primary w-100">
              {!slide.id ? content.buttonSaveSlideText : content.buttonEditSlideText}
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default FormSlide;
