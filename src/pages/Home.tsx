
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { dummyRecipes, searchRecipes } from "@/lib/dummy-data";
import { RecipeGrid } from "@/components/recipe/RecipeGrid";

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [displayedRecipes, setDisplayedRecipes] = useState(dummyRecipes);

  useEffect(() => {
    if (searchQuery) {
      const filteredRecipes = searchRecipes(searchQuery);
      setDisplayedRecipes(filteredRecipes);
    } else {
      setDisplayedRecipes(dummyRecipes);
    }
  }, [searchQuery]);

  const featuredRecipes = dummyRecipes.slice(0, 3);

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Chef's Corner</h1>
        <p className="text-xl text-muted-foreground">
          Discover delicious recipes curated by our professional chefs.
        </p>
      </section>

      {searchQuery ? (
        <>
          <h2 className="text-2xl font-bold mb-6">
            Search Results for "{searchQuery}"
          </h2>
          {displayedRecipes.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-lg text-muted-foreground">
                No recipes found matching "{searchQuery}"
              </p>
            </div>
          ) : (
            <RecipeGrid recipes={displayedRecipes} />
          )}
        </>
      ) : (
        <>
          <RecipeGrid recipes={featuredRecipes} title="Featured Recipes" />
          <RecipeGrid recipes={dummyRecipes} title="All Recipes" />
        </>
      )}
    </div>
  );
};

export default Home;
