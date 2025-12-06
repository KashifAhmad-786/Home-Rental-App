import React, { useEffect, useState } from "react"
import { categories } from "../data"
import { useDispatch, useSelector } from "react-redux"
import { setListings } from "../redux/slice/listingSlice"
import ListingCard from "./ListingCard"

const Listings = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const listings = useSelector(
    (state) => state?.listings?.listings || [] 
  )

  const dispatch = useDispatch()

  const getListings = async () => {
    try {
      const url =
        selectedCategory !== "All"
          ? `https://home-rental-app-xco9.onrender.com/api/listing?category=${selectedCategory}`
          : "https://home-rental-app-xco9.onrender.com/api/listing"

      const res = await fetch(url)
      const data = await res.json()

      dispatch(setListings({ listings: data }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getListings()
  }, [selectedCategory])

  return (
    <>
      {/* Categories List */}
      <div className="px-20 py-12 md:px-5 flex justify-center flex-wrap gap-14">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-slate-900 cursor-pointer"
            onClick={() => setSelectedCategory(category.label)}
          >
            <div
              className={`text-2xl ${
                category.label === selectedCategory ? "text-red-500" : ""
              }`}
            >
              {category.icon}
            </div>

            <p
              className={`text-lg font-bold ${
                category.label === selectedCategory ? "text-red-500" : ""
              }`}
            >
              {category.label}
            </p>
          </div>
        ))}
      </div>

      {/* Listings */}
      <div className="px-12 pb-32 lg:px-5 flex flex-wrap justify-center gap-5">
        {listings.length > 0 &&
          listings.map((item) => (
            <ListingCard
              key={item._id}
              listingId={item._id}
              creator={item.creator}
              listingPhotoPaths={item.listingPhotoPaths}
              city={item.city}
              state={item.state}
              country={item.country}
              category={item.category}
              type={item.type}
              price={item.price}
              booking={item.booking}
            />
          ))}

        {/* Show message when no items */}
        {listings.length === 0 && (
          <p className="text-xl text-gray-500 mt-10">No listings found.</p>
        )}
      </div>
    </>
  )
}

export default Listings
