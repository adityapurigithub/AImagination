import React, { useEffect, useState } from "react";
import { FormField, Loader, Card } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPost] = useState(null);

  const [searchtext, setSearchtext] = useState("");

  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    fetchCommunityPost();
  }, []);

  const fetchCommunityPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/post`
      );

      if (response.ok) {
        const { data } = await response.json();
        setAllPost(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchtext(e.target.value);
    //below using setTimeout created a debounced search functionality ........
    setTimeout(() => {
      const filterSearchResults = allPosts.filter(
        (post) =>
          post.name.toLowerCase().includes(searchtext) ||
          post.prompt.toLowerCase().includes(searchtext)
      );
      setSearchResults(filterSearchResults);
    }, 1000);
    // ................
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px] ">
          The Community Showcase
        </h1>
        <p className="mt-2 max-w-[500px] text-[#666e75] text-[16px]">
          Browse throught the collection of imaginative and visually stunning
          images generated by DALL-E AI
        </p>
      </div>

      <div className="mt-16 ">
        <FormField
          name="searchInput"
          labelName="Search in Community..."
          type="text"
          placeholder="Search using any prompt or name..."
          handleChange={handleSearchInputChange}
        />
      </div>

      <div className="mt-10 ">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchtext && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing result for{" "}
                <span className=" text-[#222328]">{searchtext}</span>
              </h2>
            )}
            {/* why grid...because grid is best for rendering images */}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchtext ? (
                <RenderCards data={searchResults} title="No Search result" />
              ) : (
                <RenderCards data={allPosts} title="No Post found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
