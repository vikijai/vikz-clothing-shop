import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// import components
import HelmetSetup from '../../components/HelmetSetup/HelmetSetup';
import Product from '../../components/Product/Product';
import { fetchApi } from '../../utils/fetchApi';

// import scss
import './ProductsPage.scss';

const ProductsPage = () => {
  // useLocation gives the current ur info like pathname and search
  const location = useLocation();
  // declare state
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isAllProducts, setIsAllProducts] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const [sortTitle, setSortTitle] = useState('');
  const [dropDownTitle, setDropDownSortTitle] = useState('Sort By');
  const [sortByPrice, setSortByPrice] = useState([
    {
      id: 1,
      url: '?_sort=maxRetailPrice&_order=asc',
      title: 'Price - Low to High'
    },
    {
      id: 2,
      url: '?_sort=maxRetailPrice&_order=desc',
      title: 'Price - High to Low'
    }
  ]);
  console.log(setSortByPrice);

  useEffect(() => {
    // fetches the categories from the db.json and render on the screen
    fetchApi('http://localhost:5000/categories', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setCategories(resInJson);
          setIsError(false);
        } else {
          setCategories([]);
          setIsError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    if (isAllProducts) {
      // fetches all products from db.json and render on the screen
      fetchApi('http://localhost:5000/products', 'GET')
        .then((resInJson) => {
          if (resInJson.statusCode !== 404) {
            setProducts(resInJson);
            setIsError(false);
          } else {
            setProducts([]);
            setIsError(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
        })
        .finally(() => {
          setCategoryName('');
          setSortTitle('');
          setDropDownSortTitle('Sort By');
          setIsLoading(false);
        });
    }
  }, [isAllProducts]);

  useEffect(() => {
    let url = 'http://localhost:5000/products';
    // Based on the categoryName set to men,women and kids fetchs from db.json
    if (categoryName === 'Men' && categoryName === 'Women' && categoryName === 'Kids') {
      // Based on the sortTitle set to hign-low and low-high fetchs from db.json
      if (sortTitle === 'Price - Low to High') {
        url = url + `?category=${categoryName}&_sort=maxRetailPrice&_order=asc`;
      } else {
        url = url + `?category=${categoryName}&_sort=maxRetailPrice&_order=desc`;
      }
    } else {
      url = url + location.search;
    }

    fetchApi(url, 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setProducts([]);
          setProducts(resInJson);
          setIsError(false);
        } else {
          setProducts([]);
          setIsError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sortTitle, categoryName, location]);

  // it handles the category name and sets the value to setCategoryName
  const handleCategories = (name) => {
    setIsAllProducts(false);
    setCategoryName(name);
    setDropDownSortTitle('Sort By');
  };

  // it handles the sortby title and sets the value to setSortTitle
  const handleSort = (title) => {
    setDropDownSortTitle(title);
    setIsAllProducts(false);
    setSortTitle(title);
  };

  // While initial load the page render with spinning border
  if (isLoading) {
    return <div className='spinner-border text-success'></div>;
  }

  // If the useEffect throws any error return alert-danger
  if (isError) {
    return (
      <div style={{ margin: '80px 10px ' }} className='alert alert-danger'>
        Some Error Occured ! Try again Later
      </div>
    );
  }

  return (
    <>
      <HelmetSetup title='Products' />
      <div className='row border border-dark products-parent'>
        <h2>Products</h2>

        <aside className='col-md-2 my-4 h-75'>
          <p>Categories</p>
          <hr />
          <Link
            to={{ pathname: '/products' }}
            className='text-decoration-none my-1'
            onClick={() => setIsAllProducts(true)}>
            All
          </Link>
          {/* renders from the db.json categories */}
          {categories.map((category) => {
            return (
              <div key={category.id} className='my-2'>
                <Link
                  to={{
                    pathname: '/products',
                    search: `?category=${category.name}`
                  }}
                  className='d-block text-decoration-none text-bold'
                  onClick={handleCategories.bind(this, category.name)}>
                  {category.name}
                </Link>
              </div>
            );
          })}
        </aside>

        {/* render all the products based on sort and category */}
        <div className='col-md-10 h-75'>
          <div className='row mx-4 mt-3 justify-content-between'>
            {/* Based on the no of products, .length will display the total products */}
            <p className='col-md-3'>{products.length} products Found</p>
            <div className='col-md-2 dropdown text-end'>
              <button
                className='btn btn-secondary dropdown-toggle'
                data-toggle='dropdown'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                {dropDownTitle}
              </button>
              <ul className='dropdown-menu'>
                {/* renders from the db.json sortBy */}
                {sortByPrice.map((sort) => {
                  return (
                    <li key={sort.id}>
                      <Link
                        className='dropdown-item'
                        to={
                          categoryName !== ''
                            ? `?category=${categoryName}&${sort.url.slice(1)}`
                            : sort.url
                        }
                        onClick={handleSort.bind(this, sort.title)}>
                        {sort.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className='row ms-5 flex-start'>
            {/* Each product is rendered inside Product component by sending as props */}
            {products?.map((product, index) => {
              return <Product key={product.id} index={index} {...product} />;
            })}
            {isError ? (
              <div className='alert alert-danger my-2 py-2'>
                Some error Occured! Try again later
              </div>
            ) : (
              ''
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default ProductsPage;
