
import { Recipe } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface RecipeDetailProps {
  recipe: Recipe;
}

export const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const {
    title,
    description,
    ingredients,
    steps,
    image,
    prepTime,
    cookTime,
    servings,
    difficulty,
    tags,
    ratings,
  } = recipe;

  // Calculate average rating
  const averageRating =
    ratings.length > 0
      ? ratings.reduce((acc, rating) => acc + rating.stars, 0) / ratings.length
      : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative rounded-lg overflow-hidden mb-8">
        <img
          src={image}
          alt={title}
          className="w-full h-[300px] sm:h-[400px] object-cover"
        />
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <span className="text-sm text-muted-foreground">Prep Time:</span>
            <span className="ml-1 font-medium">{prepTime} mins</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Cook Time:</span>
            <span className="ml-1 font-medium">{cookTime} mins</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Servings:</span>
            <span className="ml-1 font-medium">{servings}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Difficulty:</span>
            <span 
              className={`ml-1 font-medium 
                ${difficulty === 'Easy' ? 'text-sage-600' : ''}
                ${difficulty === 'Medium' ? 'text-terracotta-600' : ''}
                ${difficulty === 'Hard' ? 'text-red-600' : ''}
              `}
            >
              {difficulty}
            </span>
          </div>
          {averageRating > 0 && (
            <div>
              <span className="text-sm text-muted-foreground">Rating:</span>
              <span className="ml-1 font-medium">{averageRating.toFixed(1)} / 5</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex">
                <span className="font-medium mr-3">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {ratings.length > 0 && (
          <>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Comments ({ratings.length})
              </h2>
              <div className="space-y-4">
                {ratings.map((rating) => (
                  <div
                    key={rating.id}
                    className="bg-muted/50 p-4 rounded-md"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">
                        {rating.username}
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-1">{rating.stars}</span>
                        <span className="text-sm text-muted-foreground">/ 5</span>
                      </div>
                    </div>
                    <p className="text-sm">{rating.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
