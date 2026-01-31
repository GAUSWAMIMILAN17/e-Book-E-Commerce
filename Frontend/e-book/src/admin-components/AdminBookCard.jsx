import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const AdminBookCard = ({book}) => {
  return (
    <Card className="group overflow-hidden card-hover animate-scale-in h-full flex flex-col">
      <div className="overflow-hidden relative h-64 flex-shrink-0">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute mb-3 bottom-4 left-0 right-0 flex justify-center md:opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <Button asChild size="sm" className="gap-2">
            <Link to={`${book._id}`}>
              <Eye className="h-4 w-4" />
              View Details
            </Link>
          </Button>
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2 text-xs">
          {book.category}
        </Badge>
        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-1">{book.author}</p>
      </CardContent>
      <CardFooter className="px-4 pb-2 pt-0 flex justify-between items-center mt-auto">
        <span className="text-xl font-bold text-primary">₹{book.price}</span>
        {/* <span className="text-sm text-muted-foreground">
          Stock: {book.stock}
        </span> */}
      </CardFooter>
    </Card>
  );
};

export default AdminBookCard;