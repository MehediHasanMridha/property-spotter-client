import axios from "axios";
import { toast } from "react-toastify";

const SoopReg = () => {

    const handleRegi = async (e) => {
        e.preventDefault()
        const spooterData = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }
        const res = await axios.post('http://localhost:5000/spotter/registration', spooterData)
        if (res.data._id) {
            toast.success("Form submitted successfully");
        } else {
            toast.error("Email already use");
            console.log('error here');
        }
    }

    return (
        <>
            <div className="min-h-screen py-20">
                <div className='lg:w-[600px] mx-auto shadow-xl bg-white p-16'>
                    <form onSubmit={handleRegi}>
                        <div>
                            <h1 className='text-4xl font-bold text-center my-4 pb-10'>Spooter Registration</h1>
                        </div>
                        <div className='space-y-10'>
                            <div className='relative'>
                                <input type="text" name="name" placeholder='Shimul Zahan ' className='border border-black py-3 px-5 w-full' />
                                <h1 className='absolute -top-2 left-4 px-1 bg-white text-sm'>Your Name</h1>
                            </div>
                            <div className='relative'>
                                <input type="text" name="email" placeholder='shimul@gmail.com ' className='border border-black py-3 px-5 w-full' />
                                <h1 className='absolute -top-2 left-4 px-1 bg-white text-sm'>Your Email</h1>
                            </div>
                            <div className='relative'>
                                <input type="text" name="password" placeholder='********' className='border border-black py-3 px-5 w-full' />
                                <h1 className='absolute -top-2 left-4 px-1 bg-white text-sm'>Your Password</h1>
                            </div>
                            <button type='submit' className='border-2 bg-black text-white border-black py-3 px-5 w-full'>
                                Register Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SoopReg