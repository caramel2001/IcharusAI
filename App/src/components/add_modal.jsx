import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
const CreateProductModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    region: '',
    stage: '',
  });
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Logic to handle submission goes here
    console.log('Form submitted');
    const url = 'http://127.0.0.1:8000/add-record/';
    const params = new URLSearchParams({
        title: formData.position,
        company: formData.company,
        stage: formData.stage,
        location: formData.region
    });

    try {
            const response = await fetch(url + '?' + params, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
                // If you need to send a content-type header (e.g., for a JSON body, uncomment the following)
                // 'Content-Type': 'application/json',
            },
            // If you need to send a JSON body with the POST request, use the following:
            // body: JSON.stringify({ key: 'value' }),
            });

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            props.setJobs(data);
            console.log(data);
        } catch (error) {
            console.error('There was an error!', error);
        }
        handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  return (
    <>
      {/* Modal toggle */}
      <div className="flex justify-center">
        <button 
          onClick={handleOpen} 
          className="w-40 h-10 rounded-xl bg-slate-200 border dark:border-white border-transparent text-black text-sm" 
          type="button"
        >
          Add Application
        </button>
      </div>

      {/* Main modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            
            {/* Background overlay, show/hide based on modal state. */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            {/* Modal panel, show/hide based on modal state. */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/* Modal content */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    {/* Modal header */}
                    <div className="flex justify-between items-center pb-3">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Add Application Record
                      </h3>
                      <button 
                        type="button" 
                        className="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" 
                        onClick={handleClose}
                      >
                        <span className="sr-only">Close modal</span>
                        {/* Icon */}
                        <CloseIcon/>
                      </button>
                        </div>
                        {/* Modal body */}
                        <form onSubmit={handleSubmit}>
                       
                    <div className='grid gap-4 mb-4 sm:grid-cols-2'>
                        <div>
                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Company Name</label>
                    <input
                        type="text"
                        name="company"
                        id="company"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type Company name"
                        required
                    />
                    </div>
                    {/* Brand field */}
                    <div>
                    <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Job Position</label>
                    <input
                        type="text"
                        name="position"
                        id="position"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Job Position"
                        required
                    />
                    </div>
                    {/* Price field */}
                    <div>
                    <label htmlFor="region" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Region</label>
                    <input
                        type="text"
                        name="region"
                        id="region"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Region"
                        required
                    />
                    </div>
                    {/* Category select field */}
                    <div>
                    <label htmlFor="stage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Job stage</label>
                    <select
                        name="stage"
                        id="stage"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                        <option value="Applied">Applied</option>
                        <option value="OA">OA</option>
                        <option value="Interview">Interview</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejection">Rejection</option>
                    </select>
                    </div>
                    
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="mt-5 w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
                    Add new track record
                    </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProductModal;
