import React, { useEffect, useState } from "react";
//import { GetChildrenCategory } from "../../../Core/ApiCore/Category";
import { getProductsViewClient } from "../../../Core/ApiCore/ProductClient";

import Paginate from "../../../Components/Comon/Paginate";
import { Link } from "react-router-dom";
import { API_URL } from "../../../config";
import { isEmpty } from "lodash";

const ProductsShop = (props) => {
  //const [language] = useState(localStorage.getItem("language") ?? "Fr");
  //const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  //State Pagination
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    totalPage: 1,
    length:10,
    totalCount:0
  });
  console.log(props)
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
    console.log(filters)
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
	const [isListView, setIsListView] = useState(false);

  const urlImage = (product) => {
    return `${API_URL}User/Image?slug=${product.slug}&file=${product.image}`;
  }
  
  

  useEffect(() => {
    let category = props.match.params.category;
    let search = props.match.params.search?.replace('_',' ');
    //const {category, search} = useParams();
    filters.categories = !!category && category !== '0' ? [category] : [];
    filters.search = search;
    setFilters({
      ...filters,
      categories: !!category && category !== '0' ? [category] : [],
      search:search
    });

    // if (category) {
    //   category = parseInt(category);
    //   filters.categories = [category];
    //   filters.search = search;
    //   handleFilters([category], 'categories');
    // }
    // if (search) {
    //   handleFilters(search, 'search');
    // }
    // GetChildrenCategory('', true,true).then((res) => {
    //   setCategories(res);
    // });
    // getActiveCategories().then((res) => {
    //   setCategories(res);
    // });
    searchProducts();
  }, []);

  return (
    <div className="span9">
      <ul className="breadcrumb">
      <li><a href="/">Accueil</a> <span className="divider">/</span></li>
      <li className="active">Liste des produits</li>
      </ul>
      {/* <h3> Liste des produits <small className="pull-right"> {products.length} produits sont disponibles </small></h3>	 */}
      <hr className="soft"/>
      {/* <p>
        Nowadays the lingerie industry is one of the most successful business spheres.We always stay in touch with the latest fashion tendencies - that is why our goods are so popular and we have a great number of faithful customers all over the country.
      </p> */}
      <p>{!isEmpty(products) ? `résultat : ${pagination.totalCount} produit(s)`:"aucun résultat"} </p>
      {!isEmpty(products) && <Paginate
        pagination={pagination}
        onPageChange={onPageChange}
        onLengthPageChange={onLengthPageChange}
        />}
      <hr className="soft"/>
      {/* <form className="form-horizontal span6">
        <div className="control-group">
          <label className="control-label alignL">Trier par </label>
            <select>
                  <option>Product name A - Z</option>
                  <option>Product name Z - A</option>
                  <option>Product Stoke</option>
                  <option>Price Lowest first</option>
                </select>
        </div>
      </form> */}
      <div id="myTab" className="pull-right">
      <a href="#listView" onClick={()=>setIsListView(true)} data-toggle="tab"><span className={`btn btn-large ${isListView ? "btn-primary":""}`}><i className="icon-list"></i></span></a>
      <a href="#blockView" onClick={()=>setIsListView(false)} data-toggle="tab"><span className={`btn btn-large ${!isListView ? "btn-primary":""}`}><i className="icon-th-large"></i></span></a>
      </div>
      <br className="clr"/>
      <div className="tab-content">
        <div className="tab-pane" id="listView">
          {products.map((product,i)=>(
            <div key={i}>
              <div title={product.name} className="row">	  
                <Link to={"/product/"+product.slug} className="span2">
                  <img className="list-view-image" src={urlImage(product)} alt=""/>
                </Link>
                <div className="span4">
                  <h3>{!!product.shortName ? product.shortName : product.name.substring(0,10)}</h3>				
                  <hr className="soft"/>
                  <h6 title={product.name}>{product.name}</h6>
                  {/* <Link className="btn btn-small pull-right" to={"/Product/"+product.slug}>Voir les détails</Link> */}
                  <br className="clr"/>
                </div>
                <div className="span3 alignR">
                  <form className="form-horizontal qtyFrm">
                    {/* <label className="checkbox">
                      <input type="checkbox"/>  Adds product to compair
                    </label> */}
                    <br/><Link to={"/product/"+product.slug} className="btn btn-large btn-primary btn-price"> <i className=" icon-shopping-cart"> </i> {product.newPrice} Dhs</Link>
                    {/* <Link to={"/product/"+product.slug} className="btn btn-large"><i className="icon-zoom-in"></i></Link> */}
                  </form>
                </div>
              </div>
              <hr className="soft"/>
            </div>
          ))}
        </div>
        <div className="tab-pane active" id="blockView">
          <ul className="thumbnails">
            {products.map((product,i)=>(
              <li key={i} className="span3">
                <div title={product.name} className="thumbnail">
                  <Link to={"/product/"+product.slug}><img src={urlImage(product)} alt=""/></Link>
                  <div className="caption">
                    <h6 title={product.name}>{!!product.shortName ? product.shortName : product.name.substring(0,10)}</h6>
                    <h4><Link className="btn btn-primary" to={"/product/"+product.slug}><i className="icon-shopping-cart"></i> {product.newPrice} Dhs</Link></h4>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <hr className="soft"/>
        </div>
      </div>
      {/* <a href="compair.html" className="btn btn-large pull-right">Compair Product</a> */}
      {!isEmpty(products) && <Paginate
        pagination={pagination}
        onPageChange={onPageChange}
        onLengthPageChange={onLengthPageChange}
        />}
      <br className="clr"/>
    </div>
  );
};

export default ProductsShop;
