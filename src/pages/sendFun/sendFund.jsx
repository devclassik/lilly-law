import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const SendFund = () => {
  const formik = useFormik({
    initialValues: {
      recipient: '',
      amount: '',
      message: '',
    },
    validationSchema: Yup.object({
      recipient: Yup.string()
        .email('Invalid email address')
        .required('Recipient email is required'),
      amount: Yup.number()
        .required('Amount is required')
        .positive('Amount must be positive')
        .integer('Amount must be an integer'),
      message: Yup.string().max(200, 'Message must be 200 characters or less'),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log('Form values:', values);
      // Add your axios POST request here
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Send Fund</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="recipient"
              className="block text-sm font-medium text-gray-700"
            >
              Recipient Email
            </label>
            <input
              id="recipient"
              name="recipient"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.recipient}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                formik.touched.recipient && formik.errors.recipient
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.recipient && formik.errors.recipient ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.recipient}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                formik.touched.amount && formik.errors.amount
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.amount}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message (optional)
            </label>
            <textarea
              id="message"
              name="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                formik.touched.message && formik.errors.message
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.message}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600 transition-colors"
          >
            Send Fund
          </button>
        </form>
      </div>
    </div>
  );
};
