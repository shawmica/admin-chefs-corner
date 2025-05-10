
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipeById } from "@/lib/dummy-data";
import { RecipeDetail as RecipeDetailComponent } from "@/components/recipe/RecipeDetail";
import { Spinner } from "@/components/ui/spinner";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (id) {
      // Simulate API call
      setTimeout(() => {
        const recipeData = getRecipeById(parseInt(id));
        if (recipeData) {
          setRecipe(recipeData);
        } else {
          // Recipe not found, redirect to home
          navigate("/", { replace: true });
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="container px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8">
      {recipe && <RecipeDetailComponent recipe={recipe} />}
    </div>
  );
};

export default RecipeDetail;
