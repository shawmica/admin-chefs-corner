
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dummyRecipes, deleteRecipe } from "@/lib/dummy-data";
import { RecipeTable } from "@/components/admin/RecipeTable";
import { useToast } from "@/components/ui/use-toast";

const AdminRecipes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState(dummyRecipes);

  const filteredRecipes = searchQuery
    ? recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : recipes;

  const handleDelete = (id: number) => {
    const success = deleteRecipe(id);
    if (success) {
      setRecipes(recipes.filter(recipe => recipe.id !== id));
      toast({
        title: "Recipe deleted",
        description: "The recipe has been deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete the recipe",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Recipes</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all recipes in the database.
          </p>
        </div>
        <Button
          onClick={() => navigate("/admin/recipes/add")}
          className="mt-4 md:mt-0"
        >
          Add New Recipe
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <RecipeTable recipes={filteredRecipes} onDelete={handleDelete} />
    </div>
  );
};

export default AdminRecipes;
