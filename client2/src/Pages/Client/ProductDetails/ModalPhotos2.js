import React, { useEffect } from "react";

const ModalPhotos = ({ images, isOpen, toggle, index, setIndex }) => {
  
  useEffect(() => {}, []);

  const closeModal = () => {
    toggle();
  }
  
  const plusSlides  = (n) => {
    currentSlide(index + n);
  }
  
  const currentSlide = (n) => {
    if (n >= images.length) {n = 0}
    if (n < 0) {n = images.length-1}
    setIndex(n);
    //showSlides(index = n);
  }
  // var modal = document.getElementById("myModal");
  // window.onclick = function(event) {
  //   console.log(event.target);
  //   if (event.target !== modal && isOpen) {
  //     //modal.style.display = "none";
  //     toggle();
  //   }
  // }
  
  return (
    <div id="myModal" style={isOpen ? {display:"block"}:{display:"none"}}>
      <span className="close cursor" onClick={()=>closeModal()}>&times;</span>
      <div className="modal-content">
        {images && 
            <div className="mySlides">
                <div className="numbertext">{`${index+1} / ${images.length}`}</div>
                <img src={images[index]} className="image-modal-selected" />
            </div>
        }
        <a className="prev" onClick={()=>plusSlides(-1)}>&#10094;</a>
        <a className="next" onClick={()=>plusSlides(1)}>&#10095;</a>
        {images && images.map((img,i)=>(
            <div key={i} className="column">
                <img className={`demo cursor image-modal${i === index ? ' image-modal-active':''}`} src={img} onClick={()=>currentSlide(i)} alt="" />
            </div>
        ))}
      </div>
    </div>
  );
};

export default ModalPhotos;
