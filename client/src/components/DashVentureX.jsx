import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';

export default function DashVentureX() {
  const { currentUser } = useSelector((state) => state.user);
  const [userVenturex, setVenturexPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [instituteIdToDelete, setInstituteIdToDelete] = useState('');
  useEffect(() => {
    const fetchInstitute = async () => {
      try {
        const res = await fetch(`/api/institute/getInstitute?userId=${currentUser._id}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            setVenturexPosts(data.institute);
          if (data.institute.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
        fetchInstitute();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userVenturex.length;
    try {
      const res = await fetch(
        `/api/institute/getInstitute?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setVenturexPosts((prev) => [...prev, ...data.institute]);
        if (data.institute.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteInstitute = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/institute/deleteinstitute/${instituteIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setVenturexPosts((prev) =>
          prev.filter((institute) => institute._id !== instituteIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userVenturex.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Institute Name</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Mode</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userVenturex.map((institute) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(institute.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  {/* <Table.Cell>
                    <Link to={`/institute/${institute.slug}`}>
                      <img
                        src={institute.image}
                        alt={institute.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell> */}
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/institute/${institute.slug}`}
                    >
                      {institute.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{institute.category}</Table.Cell>
                  <Table.Cell>{institute.mode}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setInstituteIdToDelete(institute._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-institute/${institute._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no institutes yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this institute?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteInstitute}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
