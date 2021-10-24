import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { GetChildrenCategory } from "../../../Core/ApiCore/Category";
import { getProductsViewClient } from "../../../Core/ApiCore/ProductClient";
import FilterCategory from "./FilterCategory";
import FilterPrice from "./FilterPrice";
import ProductCard from "./ProductCard";

import Paginate from "../../../Components/Comon/Paginate";
import { Link } from "react-router-dom";

const ProductsShop = (props) => {
  const [language] = useState(
    localStorage.getItem("language") ?? "Fr"
  );
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  //State Pagination
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    totalPage: 1,
    length:10,
    totalCount:0
  });

  const [filters, setFilters] = useState({
    pageNumber: 1,
    length: 10,
    categories: [],
    price: [],
    search:''
  });

  //Handle Page click
  const onPageChange = (newPage) => {
    pagination.pageNumber = newPage;
    setPagination({...pagination, pageNumber: newPage});
    filters.pageNumber = newPage;
    setFilters({
      ...filters,
      pageNumber: newPage,
    });
    searchProducts();
  };

  const onLengthPageChange =(length)=>{
    filters.length = length;
    handleFilters(length, 'length');
    pagination.length = length;
    setPagination({...pagination, length: length});
    searchProducts();
  }
  
  const handleFilters = (data, filterBy) => {
    setFilters({
      ...filters,
      [filterBy]: data,
    });
  };

  // useEffect(() => {
  // }, []);
  const searchProducts = () => {
    getProductsViewClient(filters).then((res) => {
      if (res && res.list) {
        setProducts(res.list);
        pagination.totalPage = res.totalPage;
        setPagination({
          ...pagination,
          pageNumber: res.pageNumber,
          totalPage: res.totalPage,
          totalCount: res.totalCount
        });
      }
    });
  }
	const [isListView, setIsListView] = useState(true);

  useEffect(() => {
    let category = props.match.params.category;
    if (category) {
      category = parseInt(category);
      filters.categories = [category];
      handleFilters([category], 'categories');
    }
    GetChildrenCategory('', true,true).then((res) => {
      setCategories(res);
    });
    // getActiveCategories().then((res) => {
    //   setCategories(res);
    // });
    searchProducts();
  }, []);

  return (
    <div class="span9">
      <ul class="breadcrumb">
      <li><a href="/">Accueil</a> <span class="divider">/</span></li>
      <li class="active">Liste des produits</li>
      </ul>
      <h3> Liste des produits <small class="pull-right"> {products.length} produits sont disponibles </small></h3>	
      <hr class="soft"/>
      {/* <p>
        Nowadays the lingerie industry is one of the most successful business spheres.We always stay in touch with the latest fashion tendencies - that is why our goods are so popular and we have a great number of faithful customers all over the country.
      </p> */}
      <hr class="soft"/>
      <form class="form-horizontal span6">
        <div class="control-group">
          <label class="control-label alignL">Sort By </label>
            <select>
                  <option>Priduct name A - Z</option>
                  <option>Priduct name Z - A</option>
                  <option>Priduct Stoke</option>
                  <option>Price Lowest first</option>
                </select>
        </div>
      </form>
      <div id="myTab" class="pull-right">
      <a href="#listView" onClick={()=>setIsListView(true)} data-toggle="tab"><span className={`btn btn-large ${isListView ? "btn-primary":""}`}><i className="icon-list"></i></span></a>
      <a href="#blockView" onClick={()=>setIsListView(false)} data-toggle="tab"><span className={`btn btn-large ${!isListView ? "btn-primary":""}`}><i className="icon-th-large"></i></span></a>
      </div>
      <br class="clr"/>
      <div class="tab-content">
        <div class="tab-pane active" id="listView">
          {products.map((product,i)=>(
            <div key={i}>
              <div class="row">	  
                <div class="span2">
                  <img src={product.image} alt=""/>
                </div>
                <div class="span4">
                  <h3>New | Available</h3>				
                  <hr class="soft"/>
                  <h5>{product.name} </h5>
                  <p>
                  {product.description}
                  </p>
                  <Link class="btn btn-small pull-right" to={"/Product/"+product.slug}>Voir les détails</Link>
                  <br class="clr"/>
                </div>
                <div class="span3 alignR">
                  <form class="form-horizontal qtyFrm">
                    <h3> {product.newPrice} Dhs</h3>
                    {/* <label class="checkbox">
                      <input type="checkbox"/>  Adds product to compair
                    </label><br/> */}
                    <Link to={"/product/"+product.slug} class="btn btn-large btn-primary"> Add to <i class=" icon-shopping-cart"></i></Link>
                    {/* <Link to={"/product/"+product.slug} class="btn btn-large"><i class="icon-zoom-in"></i></Link> */}
                  </form>
                </div>
              </div>
              <hr class="soft"/>
            </div>
          ))}
        </div>
        <div class="tab-pane" id="blockView">
          <ul class="thumbnails">
            {products.map((product,i)=>(
              <li class="span3">
                <div class="thumbnail">
                  <Link to={"/product/"+product.slug}><img src={product.image} alt=""/></Link>
                  <div class="caption">
                    <h5>{product.name}</h5>
                    <p> 
                    {product.description}
                    </p>
                    <h4 style={{textAlign:"center"}}> <Link className="btn" to={"/product/"+product.slug}>Ajouter <i class="icon-shopping-cart"></i></Link> <Link className="btn btn-primary" to={"/product/"+product.slug}>{product.newPrice} Dhs</Link></h4>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <hr class="soft"/>
        </div>
      </div>
      {/* <a href="compair.html" class="btn btn-large pull-right">Compair Product</a> */}
      <div class="pagination">
        <ul>
          <li><a href="#">‹</a></li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">...</a></li>
          <li><a href="#">›</a></li>
        </ul>
      </div>
      <br class="clr"/>
    </div>
  );
};

export default ProductsShop;
