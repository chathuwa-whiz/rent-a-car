import React, { useState } from 'react'
import { TbSearch, TbArrowLeft, TbHeart, TbArrowRight } from 'react-icons/tb'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const carData = [
  {
    id: 1,
    name: "HR-V Hybrid",
    image: "/car-model.png",
    price: 600,
    booked: true
  },
  {
    id: 2,
    name: "Honda CR-V",
    image: "/car-model.png",
    price: 600,
    booked: false
  },
  {
    id: 3,
    name: "Civic Type R",
    image: "/car-model.png",
    price: 600,
    booked: false
  },
  {
    id: 4,
    name: "Honda ZR-V",
    image: "/car-model.png",
    price: 600,
    booked: true
  },
  {
    id: 5,
    name: "Honda Jazz",
    image: "/car-model.png",
    price: 600,
    booked: false
  },
  {
    id: 6,
    name: "Honda Civic",
    image: "/car-model.png",
    price: 600,
    booked: false
  },
  {
    id: 3,
    name: "Civic Type R",
    image: "/car-model.png",
    price: 600,
    booked: false
  },
  {
    id: 4,
    name: "Honda ZR-V",
    image: "/car-model.png",
    price: 600,
    booked: true
  },
  {
    id: 5,
    name: "Honda Jazz",
    image: "/car-model.png",
    price: 600,
    booked: false
  },
  {
    id: 6,
    name: "Honda Civic",
    image: "/car-model.png",
    price: 600,
    booked: false
  }
];

export default function Fleet() {

  const [range, setRange] = useState([2000, 500000]);

  const handleRangeChange = (newRange) => {
    setRange(newRange);
  };

  return (
    <div className='flex bg-primarybg p-4 gap-x-5'>

      {/* filtering system */}
      <div className='w-1/4 h-full bg-black text-white rounded-2xl p-4 overflow-scroll scrollbar-hide'>

        {/* search bar */}
        <div className='border border-graydark py-2 px-6 mx-5 rounded-xl flex justify-between items-center mb-5'>
          <div className='font-semibold text-graydark'>Search</div>
          <TbSearch className='text-graydark' />
        </div>

        {/* Reset button */}
        <div className='flex justify-between mb-5'>
          <div className='font-semibold text-2xl text-white'>Filters</div>
          <div className='font-semibold text-gasolindark'>Reset</div>
        </div>

        {/* Vehicle and model dropdowns */}
        <div className='flex justify-between gap-3 mb-5'>
          <select className='py-2 px-6 rounded-lg bg-graydark w-full'>
            <option>Honda</option>
          </select>
          <select className='py-2 px-6 rounded-lg bg-graydark w-full'>
            <option>Car Model</option>
          </select>
        </div>

        {/* Price range */}
        <div className='mb-7'>
          <p className='mb-2'>Price range per day</p>
          <div className="relative mb-8">
            <div className="flex justify-between mb-4">
              <div className="bg-gradient-to-b from-gasolindark to-gasolinlight rounded px-3 py-1">
                <span className="text-white text-sm">Rs.{range[0]}</span>
              </div>
              <div className="bg-gradient-to-b from-gasolindark to-gasolinlight rounded px-3 py-1">
                <span className="text-white text-sm">Rs.{range[1]}</span>
              </div>
            </div>
            <Slider
              range
              min={2000}
              max={500000}
              value={range}
              onChange={handleRangeChange}
              trackStyle={[{ backgroundColor: '#177A65' }]}
              handleStyle={[
                {
                  backgroundColor: '#177A65',
                  borderColor: '#24AC90',
                  opacity: 1
                },
                {
                  backgroundColor: '#177A65',
                  borderColor: '#24AC90',
                  opacity: 1
                }
              ]}
              railStyle={{ backgroundColor: '#374151' }}
            />
          </div>
        </div>

        {/* Type */}
        <div className='mb-7'>
          <p className='mb-2'>Type</p>
          <div className='grid grid-cols-3 gap-3 mb-5 text-graydark'>
            <div className='gap-2 flex items-center'>
              <input type='checkbox' />
              <label>Sedan</label>
            </div>
            <div className='gap-2 flex items-center'>
              <input type='checkbox' />
              <label>Couple</label>
            </div>
            <div className='gap-2 flex items-center'>
              <input type='checkbox' />
              <label>Van</label>
            </div>
            <div className='gap-2 flex items-center'>
              <input type='checkbox' />
              <label>Wagon</label>
            </div>
            <div className='gap-2 flex items-center'>
              <input type='checkbox' />
              <label>SUV</label>
            </div>
          </div>
        </div>

        {/* Transmission Type */}
        <div className='mb-7'>
          <p className='mb-2'>Transmission Type</p>
          <div className='grid grid-cols-2 gap-3 text-graydark'>
            <div className='gap-2 flex items-center'>
              <input type='checkbox' />
              <label>Automatic</label>
            </div>
            <div className='gap-2 flex items-center'>
              <input type='checkbox' />
              <label>Manual</label>
            </div>
          </div>
        </div>

        {/* No of seats */}
        <div className='mb-7'>
          <p className='mb-2'>Number of seats</p>
          <select className='py-1 px-10 rounded-lg border border-graydark text-graydark'>
            <option>4</option>
          </select>
        </div>

        <hr className='border border-graydark' />

        {/* Available now only */}
        <div className='mt-5 mb-7'>
          <div className='gap-2 flex items-center'>
            <label>Available now only</label>
            <input type='checkbox' />
          </div>
        </div>

        {/* rental type */}
        <div className='mb-7'>
          <p className='mb-2'>Rental Type</p>
          <div className='grid grid-cols-3 gap-2'>
            <div className='bg-graydark rounded-lg py-2 text-center'>Any</div>
            <div className='bg-graydark rounded-lg py-2 text-center'>Per Day</div>
            <div className='bg-graydark rounded-lg py-2 text-center'>Per hours</div>
          </div>
        </div>

      </div>

      {/* vehicle list */}
      <div className='w-3/4'>

        {/* back */}
        <div className='flex gap-2 items-center'>
          <TbArrowLeft className='text-graydark' />
          <div className='font-bold text-graydark'>Back</div>
        </div>

        {/* vehicle grid */}
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
          {carData.map(car => (
            <div key={car.id} className='rounded-2xl border border-graydark'>
              <div className='relative'>
                <img src={car.image} alt={car.name} className='w-full' />
                <div className='absolute top-2 right-2 rounded-full p-2'>
                  <TbHeart className='text-graydark' />
                </div>
                {car.booked && (
                  <div className='absolute top-2 left-2 bg-darkred text-graylight text-sm font-semibold px-2 rounded-sm'>Booked</div>
                )}
              </div>
              <div className='p-4'>
                <div className='font-bold text-lg text-white'>{car.name}</div>
                <div className='flex justify-between items-center'>
                  <p className='font-bold'>
                    <span className='text-gasolindark'>Rs.{car.price}</span>
                    <span className='text-graydark'> / Per Day</span>
                  </p>
                  <div className='flex items-center gap-2 text-gasolindark font-bold'>
                    <p>DRIVE NOW</p>
                    <TbArrowRight />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
