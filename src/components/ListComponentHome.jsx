import { useEffect, useState } from 'react'

// for api calls
import axios from 'axios';

// assets
// import { FaCaretDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ListComponentHome = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // for navigation
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await axios.get('/api/getAllCategories', {
          headers: {
            'Channel-Code': 'ANDROID',
          },
        });
        setCategories(response.data.Data.categories);
        console.log("checking categories data:", response.data.Data.categories);
      } catch (error) {
        setError(`Error fetching categories: ${error.message}`);
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleCategoryClick = (c_id) => {
    navigate(`/ProductList/${c_id}`);
  };

  const handleSubCategoryClick = (c_id) => {
    navigate(`/ProductList/${c_id}`);
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-[6px] border-t-orange-600" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <ul className="w-full container flex justify-center items-center flex-wrap gap-4 gap-y-0">
      {categories.map((category) => (
        <li key={category.c_id} className="group cursor-pointer ">
          <button
            className="flex items-center gap-2 py-[0.40rem] hover:text-orange-600 focus:outline-none"
            onClick={() => handleCategoryClick(category.c_id)}
          >
            {category.category || 'Unnamed Category'}
            {/* <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" /> */}
          </button>

          {/* i think the data is modified, its no more including subcategories */}
          {category.sub_categories?.length > 0 && (
            <div className="absolute left-0 right-0 z-50 border hidden group-hover:flex w-screen bg-white p-2 text-black shadow-md">
              <ul className="container mx-auto grid grid-rows-6 grid-flow-col justify-start gap-1 md:gap-x-16 lg:gap-x-40 gap-y-2 h-fit">
                {category.sub_categories.map(
                  (subCategory) =>
                    subCategory.show === '1' && (
                      <li
                        key={subCategory.c_id}
                        // className="py-1 hover:text-orange-600 cursor-pointer text-left"
                        className="py-1 cursor-pointer text-left relative hover:text-orange-600 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full"
                        onClick={() => handleSubCategoryClick(subCategory.c_id)}
                      >
                        {subCategory.category || 'Unnamed Subcategory'}
                      </li>

                    )
                )}
              </ul>

            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListComponentHome;
