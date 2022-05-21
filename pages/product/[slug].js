/* eslint-disable @next/next/no-img-element */
import React from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img alt="productdetails" src={urlFor(image && image[0])} />
          </div>
          {/* <div className="small-images-container">
            {image?.map((item, index) => (
              <img
                key={index}
                alt="item"
                className=""
                onMouseEnter=""
                src={urlFor(item)}
              />
            ))}
          </div> */}
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
            <h4>Details:</h4>
            <p>{details}</p>
            <p className="price">₹{price}</p>
            <div className="quantity">
              <h3>Quantity:</h3>
              <p className="quantity-desc">
                <span onClick="" className="minus">
                  <AiOutlineMinus />
                </span>
                <span onClick="" className="num">
                  0
                </span>
                <span onClick="" className="plus">
                  <AiOutlinePlus />
                </span>
              </p>
            </div>
            <div className="buttons">
              <button className="add-to-cart" onClick="" type="button">
                Add to Cart
              </button>
              <button className="buy-now" onClick="" type="button">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type=="product"]{
    slug{
        current
    }
}`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}' ][0] `;
  const productQuery = '*[_type=="product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type=="banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
