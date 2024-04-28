import React, { useContext, useState } from 'react';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
];

const Steper = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionSelector, setSelectedOptionSelector] = useState('');
    const [access, setAccess] = useState(false);

    const [name, setName] = useState(null);
    const [property, setProperty] = useState('');
    const [bedroom, setBedroom] = useState('');
    const [bathroom, setBathroom] = useState('');
    const [sellTime, setSellTime] = useState('');
    const [spooName, setSpooName] = useState('')
    const [spooEmail, setSpooEmail] = useState('')
    const [spooPhone, setSpooPhone] = useState('')
    const [selectedAgency, setSelectedAgency] = useState('')
    const [agency, setAgency] = useState([]);

    const previousStep = () => {
        setActiveStep(activeStep - 1);
        setAccess(false)
    };

    const nextStep = () => {
        setActiveStep(activeStep + 1);
        setAccess(false)
    };

    const handleAgencySelect = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        console.log(selectedValues);
        setAgency(selectedValues);
    };

    const isLastStep = activeStep === 4;

    const handleButtonClick = () => {
        if (isLastStep) {
            console.log('done');
            const data = {
                houseName: name,
                bedroom,
                bathroom,
                previousStep,
                sellTime,
                spooName,
                spooEmail,
                spooPhone,
                agency
            }
            console.log(data);
            toast.success("Form submitted successfully", data);
        } else {
            nextStep();
        }
    };


    return (
        <div className="max-w-3xl mx-auto rounded-lg">

            <div className='py-10'>
                <h2 className="sr-only">Steps</h2>

                <div className="after:mt-4 after:block max-w-[400px] mx-auto after:w-full">
                    <ol className="grid grid-cols-4 text-sm font-medium text-gray-500">
                        <li className="relative flex justify-start text-blue-600">
                            <span className={`absolute -bottom-[1.75rem] start-0 border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full text-black ${activeStep === 1 ? 'bg-[#5D656A] text-white' : 'bg-white'}`}>
                                {
                                    (activeStep === 2 || activeStep === 3 || activeStep === 4 || activeStep === 5) ? <IoIosCheckmarkCircle className='h-6 w-6 text-[#5D656A]' /> : <h1>1</h1>
                                }
                            </span>
                        </li>

                        <li className="relative flex justify-center text-blue-600">
                            <span
                                className={`absolute -bottom-[1.75rem] -ml-10  border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full text-black ${activeStep === 2 ? 'bg-[#5D656A] text-white' : 'bg-white'}`}
                            >
                                {
                                    activeStep === 3 || activeStep === 4 || activeStep === 5 ? <IoIosCheckmarkCircle className='h-6 w-6 text-[#5D656A]' /> : <h1>2</h1>
                                }
                            </span>
                        </li>

                        <li className="relative flex justify-center text-blue-600">
                            <span
                                className={`absolute -bottom-[1.75rem] ml-16 border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full text-black ${activeStep === 3 ? 'bg-[#5D656A] text-white' : 'bg-white'}`}
                            >
                                {
                                    activeStep === 4 || activeStep === 5 ? <IoIosCheckmarkCircle className='h-6 w-6 text-[#5D656A]' /> : <h1>3</h1>
                                }
                            </span>
                        </li>

                        <li className="relative flex justify-center text-blue-600">
                            <span className={`absolute -bottom-[1.75rem] end-0 border border-gray-400 w-8 h-8 flex justify-center items-center rounded-full text-black ${activeStep === 4 ? 'bg-[#5D656A] text-white' : 'bg-white'}`}>
                                {
                                    activeStep === 5 ? <IoIosCheckmarkCircle className='h-6 w-6 text-[#5D656A]' /> : <h1>4</h1>
                                }
                            </span>
                        </li>
                    </ol>
                </div>
            </div>

            {/* here contents */}
            <div className="p-6">
                {activeStep === 1 && (
                    <div className='max-w-[400px] mx-auto py-20 space-y-5'>
                        <div className="mt-4">
                            <div className='relative'>
                                <input onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder='Shimul Zahan ' className='border border-black py-3 px-5 w-full' />
                                <h1 className='absolute -top-2 left-4 px-1 bg-white text-sm'>Your Name</h1>
                            </div>
                            <div className='flex w-full justify-end items-center gap-5 py-10'>
                                {!isLastStep && name && (
                                    <div onClick={handleButtonClick} className='flex cursor-pointer w-full justify-center items-center gap-2 bg-[#AEB2B4] px-10'>
                                        <button className={`text-white py-2 rounded ${name ? 'disabled' : 'enabled'}`}>Next </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeStep === 2 && name && (
                    <div className='max-w-[600px] mx-auto py-10 space-y-5 flex flex-col justify-center items-center'>
                        <div className='space-y-5'>
                            <div>
                                <label className="form-control w-[400px]">
                                    <div className="label">
                                        <span className="label-text">Property type</span>
                                    </div>
                                    <select onChange={(e) => setProperty(e.target.value)} className="select select-bordered">
                                        <option disabled selected>Pick one</option>
                                        <option value={'house'}>House</option>
                                        <option value={'apartment/flat'}>Apartment/Flat</option>
                                        <option value={'townhouse'}>Townhouse</option>
                                        <option value={'farm'}>Farm</option>
                                        <option value={'commercial property'}>Commercial Property</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label className="form-control w-[400px]">
                                    <div className="label">
                                        <span className="label-text">Bedrooms</span>
                                    </div>
                                    <select value={bedroom} onChange={(e) => setBedroom(e.target.value)} className="select select-bordered">
                                        <option disabled value="">Pick one</option>
                                        <option value="1">1 Bedroom</option>
                                        <option value="2">2 Bedrooms</option>
                                        <option value="3">3 Bedrooms</option>
                                        <option value="4 or more">4 or more Bedrooms</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label className="form-control w-[400px]">
                                    <div className="label">
                                        <span className="label-text">Bathrooms</span>
                                    </div>
                                    <select value={bathroom} onChange={(e) => setBathroom(e.target.value)} className="select select-bordered">
                                        <option disabled value="">Pick one</option>
                                        <option value="1">1 Bathroom</option>
                                        <option value="2">2 Bathrooms</option>
                                        <option value="3">3 Bathrooms</option>
                                        <option value="4 or more">4 or more Bathrooms</option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-between items-center gap-5 py-10'>
                            <div className='grid grid-cols-2 w-[400px] justify-center items-center gap-5'>
                                <button onClick={previousStep} className="bg-transparent w-full border border-gray-400 text-black px-10  py-2 rounded">Cancel</button>

                                {!isLastStep && (property && bedroom && bathroom) && (
                                    <button onClick={handleButtonClick} className="bg-[#AEB2B4] px-10 w-full text-white py-2 rounded ">Active</button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeStep === 3 && (property && bedroom && bathroom) && (
                    <div className='py-20'>
                        <div className='max-w-[400px] mx-auto clear-start space-y-5 '>
                            <p className='text-2xl font-medium text-center py-5'>When would you likely be able to <br /> sell your property?</p>
                            <button onClick={() => setSellTime('now')} className={`border w-full py-2 border-black hover:border-green-300 ${sellTime === 'now' ? 'bg-green-500' : ''}`}>
                                <h1>Now</h1>
                            </button>
                            <button onClick={() => setSellTime('1-3 month')} className={`border w-full py-2 border-black hover:border-green-300 ${sellTime === '1-3 month' ? 'bg-green-500' : ''}`}>
                                <h1>1-3 months</h1>
                            </button>
                            <button onClick={() => setSellTime('4-6 month')} className={`border w-full py-2 border-black hover:border-green-300 ${sellTime === '4-6 month' ? 'bg-green-500' : ''}`}>
                                <h1>4-6 months</h1>
                            </button>
                            <button onClick={() => setSellTime('not for sell')} className={`border w-full py-2 border-black hover:border-green-300 ${sellTime === 'not for sell' ? 'bg-green-500' : ''}`}>
                                <h1>I'm not looking to sell</h1>
                            </button>
                            <div className='flex justify-between items-center gap-5 py-5'>
                                {!isLastStep && sellTime && <div onClick={handleButtonClick} className='flex bg-green-600 w-[400px] cursor-pointer justify-center items-center gap-2 px-10'>
                                    <button className=" py-2 rounded">Next</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4 content */}
                {activeStep === 4 && (
                    <div className=' py-20'>
                        <div className='max-w-[400px] mx-auto space-y-8'>
                            <div className='relative'>
                                <input onChange={(e) => setSpooName(e.target.value)} type="text" name="name" placeholder='Shimul Zahan ' className='border border-black py-3 px-5 w-full' />
                                <h1 className='absolute -top-2 left-4 px-1 bg-white text-sm'>Your Name</h1>
                            </div>
                            <div className='relative'>
                                <input onChange={(e) => setSpooEmail(e.target.value)} type="email" name="email" placeholder='shimul@gmail.com ' className='border border-black py-3 px-5 w-full' />
                                <h1 className='absolute -top-2 left-4 px-1 bg-white text-sm'>Your Email</h1>
                            </div>
                            <div className='relative'>
                                <input onChange={(e) => setSpooPhone(e.target.value)} type="number" name="mobile" placeholder='123456789' className='border border-black py-3 px-5 w-full' />
                                <h1 className='absolute -top-2 left-4 px-1 bg-white text-sm'>Your Phone Number</h1>
                            </div>
                            <div className='relative'>
                                <h1 className='px-1 bg-white text-sm'>Do you have any selected agency?</h1>
                                <div className="flex items-center space-x-4 py-5">
                                    <label>
                                        <input type="radio" name="selectedAgency" value="Yes" onChange={(e) => setSelectedAgency(e.target.value)} />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label>
                                        <input type="radio" name="selectedAgency" value="No" onChange={(e) => setSelectedAgency(e.target.value)} />
                                        <span className="ml-2">No</span>
                                    </label>
                                </div>
                            </div>
                            {
                                selectedAgency === 'Yes' && <div className="mt-6 relative">
                                    <label className="block text-sm z-50 font-medium absolute -top-3 px-2 bg-white left-3 text-gray-700">Select Organization</label>
                                    <Select
                                        defaultValue={[]}
                                        isMulti
                                        name="colors"
                                        options={colourOptions}
                                        className=""
                                        classNamePrefix="select"
                                        onChange={handleAgencySelect}
                                    />
                                </div>
                            }
                            <div className='flex justify-between items-center gap-5 py-10'>
                                <div className='grid grid-cols-2 w-full justify-center items-center gap-5'>
                                    <button onClick={previousStep} className="bg-transparent w-full border border-gray-400 text-black px-10  py-2 rounded">Cancel</button>

                                    {isLastStep && spooEmail && spooName && spooPhone && (selectedAgency === 'No' || selectedAgency !== null) && (
                                        <button onClick={handleButtonClick} className="bg-[#AEB2B4] px-10 text-white py-2 rounded ">Active</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div >
        </div >
    );
};

export default Steper;