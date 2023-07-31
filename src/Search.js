

import React, { useState, useEffect } from 'react';
import Product from './Product';
import './Search.css';
import axios from 'axios';
import iconImage from './zevi.png';

const Search = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Helper function to check if a product matches the selected filters and the search term
  const matchFiltersAndSearch = (product) => {
    // Check brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.category)) {
      return false;
    }

    // Check if the product title or description contains the search term (case-insensitive)
    if (
      search.trim() &&
      !product.title.toLowerCase().includes(search.toLowerCase()) &&
      !product.description.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    // If no filters are applied then return true
    return true;
  };

  return (
    <div style={{ display: 'flex' }}>
       <img
        src={iconImage}
        alt="Search Icon"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '100px',
          height: '80px',
        }}
      />
      <div style={{ width: '300px', marginRight: '-2px' }}>
        <div>
          <h2 style={{ marginLeft: '30px', marginTop: '90px' }}>Search&nbsp;Results</h2>
        </div>
        {/* Brand filter */}
        <div style={{ marginLeft: '20px', marginTop: '100px' }}>
          <p>CATEGORIES<i style={{ marginLeft: '85px' }} className='bx bx-chevron-down'></i></p>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <label>
            <input
              type='checkbox'
              value="men's clothing"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedBrands([...selectedBrands, e.target.value]);
                } else {
                  setSelectedBrands(selectedBrands.filter((brand) => brand !== e.target.value));
                }
              }}
            /> Men's Clothing
          </label>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <label>
            <input
              type='checkbox'
              value="women's clothing"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedBrands([...selectedBrands, e.target.value]);
                } else {
                  setSelectedBrands(selectedBrands.filter((brand) => brand !== e.target.value));
                }
              }}
            /> Women's clothing
          </label>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <label>
            <input
              type='checkbox'
              value="jewelery"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedBrands([...selectedBrands, e.target.value]);
                } else {
                  setSelectedBrands(selectedBrands.filter((brand) => brand !== e.target.value));
                }
              }}
            /> Jewelry
          </label>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <label>
            <input
              type='checkbox'
              value="electronics"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedBrands([...selectedBrands, e.target.value]);
                } else {
                  setSelectedBrands(selectedBrands.filter((brand) => brand !== e.target.value));
                }
              }}
            /> Electronics
          </label>
        </div>
        <hr></hr>

        {/* Price range filter */}
        <div style={{ marginLeft: '20px', marginTop: '20px' }}>
          <p>PRICE RANGE<i style={{ marginLeft: '80px' }} className='bx bx-chevron-down'></i></p>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <label>
            <input
              type='checkbox'
              value='500'
            /> Under 500
          </label>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <label>
            <input
              type='checkbox'
              value='1000'
            /> 1000 To 3000
          </label>
        </div>
        <hr></hr>

        {/* Ratings filter */}
        <div style={{ marginLeft: '20px', marginTop: '20px' }}>
          <p>RATINGS<i style={{ marginLeft: '120px' }} className='bx bx-chevron-down'></i></p>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <label>
            <input
              type='checkbox'
              value='5'
            /> ⭐ ⭐ ⭐ ⭐ ⭐
          </label>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <label>
            <input
              type='checkbox'
              value='4'
            /> ⭐ ⭐ ⭐ ⭐
          </label>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <label>
            <input
              type='checkbox'
              value='3'
            /> ⭐ ⭐ ⭐
          </label>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <label>
            <input
              type='checkbox'
              value='2'
            /> ⭐ ⭐
          </label>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <label>
            <input
              type='checkbox'
              value='1'
            /> ⭐
          </label>
        </div>
      </div>

      <div style={{ marginLeft: '130px' }}>
        <div className='container'>
          <input
            style={{
              marginLeft: '-300px',
              width: '500px',
              height: '40px',
              padding: '10px',
              fontSize: '18px',
              borderRadius: '5px',
              border: '2px solid #000',
              marginTop: '40px',
            }}
            type='search'
            name='src'
            placeholder='Search'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className='card-container' style={{ marginTop: '40px' }}>
          {data
            .filter(matchFiltersAndSearch) // Apply the filter and search
            .map((row, i) => {
              return (
                <div className='col-md-3' key={row.id}>
                  <Product
                    title={row.title ? row.title.slice(0, 30) : 'No description is available'}
                    description={row.description ? row.description.slice(0, 50) : 'No description is available'}
                    imageUrl={row.image ? row.image : 'https://images.meesho.com/images/products/149424175/rpekn_512.webp'}
                    price={row.price}
                    rating={row.rating.rate}
                  />
                  <style>{`
                    .card-img-top {
                      height: 250px;
                      object-fit: cover;
                    }
                  `}</style>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Search;
