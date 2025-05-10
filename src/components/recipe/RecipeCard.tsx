
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/lib/dummy-data";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { id, title, description, image, prepTime, cookTime, difficulty, tags } = recipe;
  
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <Link to={`/recipes/${id}`}>
        <div className="aspect-video relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/recipes/${id}`}>
          <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary">
            {title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Prep: {prepTime}m</span>
          <span>•</span>
          <span>Cook: {cookTime}m</span>
        </div>
        <Badge
          variant="outline"
          className={`
            ${difficulty === 'Easy' ? 'border-sage-400 text-sage-600' : ''}
            ${difficulty === 'Medium' ? 'border-terracotta-400 text-terracotta-600' : ''}
            ${difficulty === 'Hard' ? 'border-red-400 text-red-600' : ''}
          `}
        >
          {difficulty}
        </Badge>
      </CardFooter>
    </Card>
  );
};
