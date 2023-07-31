
import React, { Component } from 'react';
import './Search.css';

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
      isWishlist: false, // State to track wishlist status
    };
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  handleWishlistClick = () => {
    this.setState((prevState) => ({ isWishlist: !prevState.isWishlist }));
  };

  render() {
    const { title, description, imageUrl, price, rating } = this.props;
    const { isHovering, isWishlist } = this.state;

    return (
      <div className='car'>
        <div
          style={{
            width: '18rem',
            padding: '12px',
            position: 'relative', // Add this to make absolute positioning work
          }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <img src={imageUrl} className='card-img-top' alt='...' />
          {isHovering && (
            <button
              style={{
                position: 'center',
                top: 0,
                left: 0,
                width: '100%',
                height: '30%',
                backgroundColor: 'purple', // Change the background color on hover
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              View Product
            </button>
          )}
          <div className='shadow-lg p-3 mb-5 bg-white rounded'>
            <div>
              <div className='card-body'>
                <h5 className='card-title'>{title}...</h5>
                <p className='card-text'>{description}...</p>
                <p> Cost {price} ＄ Rating: {rating} ⭐</p>
                {/* Any other content you want to display */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
