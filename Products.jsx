import { useEffect, useState } from "react";
import { Box, Spinner, Text, Button, Input, Select } from "@chakra-ui/react";
import { ProductCarouselData } from "../component/ProductCarouselData";
import ProductCard from "../component/product/ProductCard"; 
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/productActions"; 
import ProductSlider from "../component/ProductSlider";

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);

    // State for filters and sorting
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState(null); 
    const [sortOrder, setSortOrder] = useState('lowToHigh'); 
    const itemsPerPage = 5; 
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner />
            </Box>
        );
    }

    if (error) {
        return (
            <Text color="red.500" textAlign="center">
                Error fetching products.
            </Text>
        );
    }

    if (!products || !products.length) {
        return <Text>No products found.</Text>;
    }

    // Filter logic
    const filteredProducts = products.filter(product => {
        const matchesSearch = (product.name || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
        const matchesRating = ratingFilter ? product.rating >= ratingFilter : true; // Assuming rating is numeric
        return matchesSearch && matchesCategory && matchesRating;
    });

    // Sort logic
    const sortedProducts = filteredProducts.sort((a, b) => {
        return sortOrder === 'lowToHigh' ? a.price - b.price : b.price - a.price;
    });

    // Pagination
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    return (
        <Box>
            <Box as="section" id="Slider-Section" mb={10}>
                <ProductSlider i={ProductCarouselData} />
            </Box>

            {/* Filter and Search UI */}
            <Box display="flex" justifyContent="space-between" mb={6}>
                <Input 
                    placeholder="Search products..." 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <Select 
                    placeholder="Select category"
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    {/* Add more categories as needed */}
                </Select>
                <Select 
                    placeholder="Select rating"
                    onChange={(e) => setRatingFilter(Number(e.target.value))}
                >
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                </Select>
                <Select 
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </Select>
            </Box>

            {/* Product Grid */}
            <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} p={10} mt={-8}>
                {sortedProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Box>

            {/* Pagination Controls */}
            <Box mt={6} display="flex" justifyContent="center" alignItems="center">
                <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
                    Previous
                </Button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button 
                        key={index} 
                        onClick={() => setCurrentPage(index)} 
                        variant={currentPage === index ? "solid" : "outline"}
                        mx={1}
                    >
                        {index + 1}
                    </Button>
                ))}
                <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1}>
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default Products;
