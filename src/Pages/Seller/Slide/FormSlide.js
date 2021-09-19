import React, { useEffect,useState } from "react";

// Import Editor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
import { isEmpty, isNumber } from "lodash";

import dictionary from "../../../Core/dictionary";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const FormSlide = (props) => {
  const [language] = useState(
    localStorage.getItem("language") ?? dictionary.defaultLanguage
  );
  const [slide, setSlide] = useState({
    id:0,
    title: "",
    description: "",
    link: "product/",
    index: 0
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
    e.preventDefault();
    // if (!isNumber(slide.index)) {
    //   slide.index = 0
    //   setSlide({
    //     ...slide,
    //     index: 0
    //   })
    // }else{
    //   slide.index = parseInt(slide.index) ?? 0
    //   setSlide({
    //     ...slide,
    //     index: parseInt(slide.index) ?? 0
    //   })
    // }
    
    if (slide.id) {
      UpdateSlide(slide).then(res=>{
        if (res.success) {
          files.map((file) => {
            formData.append("photos", file);
          });
          let id = res.data.id;
          UploadImageSlide(id, formData).then((res) => {
            console.log(res);
  
            toastr.options.progressBar = true;
            toastr.success("Slide modifié avec succès", "success");
            props.history.push("/seller/slides");
          });
        } else {
          toastr.error(res.message);
        }
      })
    } else {
      InsertSlide(slide).then((res) => {
        if (res.success) {
          files.map((file) => {
            formData.append("photos", file);
          });
          let id = res.data.id;
          UploadImageSlide(id, formData).then((res) => {
            console.log(res);
  
            toastr.options.progressBar = true;
            toastr.success("Slide enregistré avec succès", "success");
            props.history.push("/seller/slides");
          });
        } else {
          toastr.error(res.message);
        }
      })
    }
  }
  var content = dictionary.homeContent[language];
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']                                         // remove formatting button
    ]
  };
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
          //setSlide(res);
          setSlide({
            ...slide,
            id:res.id,
            title: res.title,
            description: res.description,
            link: res.link,
            index: res.index
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
      <form onSubmit={submitSlide}>
        <div className="card">
          <div className="card-body">

          {/* <div className="row">
              <div className="col-lg-12">
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
              <div className="col-lg-12">
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
              <div className="col-lg-12">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    {content.labelSlideDescription}
                  </label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={slide.description}
                    onChange={(e) => handleChangeDescription(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
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
              <div className="card-body" style={thumbsContainer}>
                {!isEmpty(files) &&
                  files.map((image, i) => (
                    <div style={thumb} key={i}>
                      <div style={thumbInner}>
                        <img src={image.preview ?? image} style={img} />
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
