import React, { useState } from "react";

// Import Editor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//Import toastr
import toastr from "toastr";
import "toastr/build/toastr.min.css";

import { useDropzone } from "react-dropzone";

import {
  SaveSlide,
  UploadImageSlide,
} from "../../../Core/ApiCore/ProductSeller";
import { isEmpty } from "lodash";

import dictionary from "../../../Core/dictionary"

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
    localStorage.getItem("language") ?? "Fr"
  );
  const [slide, setSlide] = useState({
    title: "title",
    description: "description",
  });

  const handleSlide = (e) => {
    setSlide({
      ...slide,
      [e.target.id]: e.target.value,
    });
  };

  const handleDescription = (e) => {
    setSlide({
      ...slide,
      description: e,
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
      );
      console.log("files", files);
    },
  });

  const submitSlide = (e) => {
    e.preventDefault();
    SaveSlide(slide).then((res) => {
      console.log(res);
      if (res.success) {
        files.map((file) => {
          formData.append("photos", file);
        });
        let id = res.data.id;
        UploadImageSlide(id, formData).then((res) => {
          console.log(res);

          toastr.options.progressBar = true;
          toastr.success("Slide Created SuccessFully", "success");
          props.history.push("/seller/slides");
        });
      } else {
        toastr.error(res.message, res.code);
      }
    });
  };
  var content = dictionary.homeContent[language]
  return (
    <React.Fragment>
      <form onSubmit={submitSlide}>
        <div className="card">
          <div className="card-body">
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
                    onChange={handleSlide}
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
                    value={slide.description}
                    onChange={(e) => handleDescription(e)}
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
                <input {...getInputProps()} />
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
                        <img src={image.preview} style={img} />
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
            {content.buttonSaveSlideText}
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default FormSlide;
