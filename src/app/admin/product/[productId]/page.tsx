"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/hooks/use-toast";
import { getProductById } from '@/data/products';
import { X, Plus, Save, ArrowLeft } from 'lucide-react';
import { Product } from '@/types/product';
import ProductCategorySelector from '@/components/ProductCategorySelector';

const AdminProductFormPage: React.FC = () => {
  const params = useParams();
  const productId = (params as { productId?: string })?.productId ?? '';  
  const router = useRouter();
  const { toast } = useToast();
  
  // const isEditMode = !!productId;
  const isNewProduct = productId === 'new';
  
  const [formData, setFormData] = useState<Partial<Product> & { isFeatured?: boolean;  promoText?: string; }>({
    id: '',
    name: '',
    price: 0,
    originalPrice: undefined,
    images: [''],
    category: '',
    subCategory: '',
    description: '',
    features: [''],
    colors: [''],
    sizes: [''],
    inStock: true,
    rating: 0,
    reviews: 0,
    isNew: false,
    isSale: false,
    isFeatured: false, // Added for featured products
    gender: 'unisex'
  });
  
  const [loading, setLoading] = useState(false);
  const isEditMode = productId !== 'new';
  
  useEffect(() => {
    if (isNewProduct && productId) {
      const product = getProductById(productId);
      if (product) {
        setFormData({
          ...product,
          isFeatured: false // We'll assume it's not featured by default when editing
        });
      }
    }
  }, [productId, isNewProduct]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle numeric values
    if (name === 'price' || name === 'originalPrice' || name === 'rating' || name === 'reviews') {
      setFormData({
        ...formData,
        [name]: name === 'originalPrice' && value === '' ? undefined : Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked,
    });
  };
  
  const handleArrayChange = (field: keyof Product, index: number, value: string) => {
    const newArray = [...(formData[field] as string[])];
    newArray[index] = value;
    
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };
  
  const addArrayItem = (field: keyof Product) => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] as string[]), ''],
    });
  };
  
  const removeArrayItem = (field: keyof Product, index: number) => {
    const newArray = [...(formData[field] as string[])];
    newArray.splice(index, 1);
    
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real application, this would send data to the API
      // For demo purposes, we'll just show success and navigate back
      
      // Generate a promo message based on product attributes
      let promoMessage = '';
      if (formData.isNew) {
        promoMessage += 'New Arrival! ';
      }
      if (formData.isSale && formData.originalPrice && formData.price !== undefined) {
        const discountPercent = Math.round((1 - (formData.price / formData.originalPrice)) * 100);
        promoMessage += `${discountPercent}% Off! `;
      }
      if (formData.isFeatured) {
        promoMessage += 'Featured Product! ';
      }
      
      // Simulate API delay
      setTimeout(() => {
        toast({
          title: isEditMode ? 'Product updated' : 'Product created',
          description: `${formData.name} has been ${isEditMode ? 'updated' : 'added'} successfully.${promoMessage ? ' Promo: ' + promoMessage : ''}`,
        });
        
        router.push('/admin/products');
      }, 1000);
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to save product data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
    {/* Back button */}
    <Button 
      variant="outline" 
      className="mb-6 border border-border"
      onClick={() => router.push('/admin/products')}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Products
    </Button>
    
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg border border-border">
      {/* Basic Information */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold border-b border-border pb-2">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="originalPrice">Original Price ($)</Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                value={formData.originalPrice || ''}
                onChange={handleChange}
                step="0.01"
                min="0"
                placeholder="If on sale"
                className="mt-1"
              />
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1"
            rows={4}
          />
        </div>
      </div>
      
      {/* Categories and Display Options */}
      <ProductCategorySelector 
        category={formData.category || ''}
        subCategory={formData.subCategory || ''}
        gender={formData.gender || 'unisex'}
        isNew={formData.isNew || false}
        isSale={formData.isSale || false}
        isFeatured={formData.isFeatured || false}
        onCategoryChange={(value) => setFormData({ ...formData, category: value })}
        onSubCategoryChange={(value) => setFormData({ ...formData, subCategory: value })}
        onGenderChange={(value) => setFormData({ ...formData, gender: value })}
        onNewChange={(checked) => setFormData({ ...formData, isNew: checked })}
        onSaleChange={(checked) => setFormData({ ...formData, isSale: checked })}
        onFeaturedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
      />
      
      {/* Promotional Information */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold border-b border-border pb-2">Promotional Information</h2>
        
        <div>
          <Label htmlFor="promoText">Promotional Text</Label>
          <Input
            id="promoText"
            name="promoText"
            value={formData.promoText || ''}
            onChange={(e) => setFormData({ ...formData, promoText: e.target.value })}
            placeholder="e.g., Limited time offer!"
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Optional promotional text to highlight special offers
          </p>
        </div>
      </div>
      
      {/* Product Images */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold border-b border-border pb-2">Product Images</h2>
        
        <div className="space-y-4">
          {formData.images?.map((image, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={image}
                onChange={(e) => handleArrayChange('images', index, e.target.value)}
                placeholder="Image URL"
                className="flex-1"
                required={index === 0}
              />
              {index > 0 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={() => removeArrayItem('images', index)}
                  className="text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed"
            onClick={() => addArrayItem('images')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </div>
      </div>
      
      {/* Product Features */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold border-b border-border pb-2">Product Features</h2>
        
        <div className="space-y-4">
          {formData.features?.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => handleArrayChange('features', index, e.target.value)}
                placeholder="Product feature"
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={() => removeArrayItem('features', index)}
                className="text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed"
            onClick={() => addArrayItem('features')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Feature
          </Button>
        </div>
      </div>
      
      {/* Colors and Sizes */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold border-b border-border pb-2">Colors and Sizes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-4">
            <Label>Available Colors</Label>
            {formData.colors?.map((color, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={color}
                  onChange={(e) => handleArrayChange('colors', index, e.target.value)}
                  placeholder="Color name"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={() => removeArrayItem('colors', index)}
                  className="text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed"
              onClick={() => addArrayItem('colors')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Color
            </Button>
          </div>
          
          <div className="space-y-4">
            <Label>Available Sizes</Label>
            {formData.sizes?.map((size, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={size}
                  onChange={(e) => handleArrayChange('sizes', index, e.target.value)}
                  placeholder="Size"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={() => removeArrayItem('sizes', index)}
                  className="text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed"
              onClick={() => addArrayItem('sizes')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Size
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Status */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold border-b border-border pb-2">Product Status</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="inStock" 
              checked={formData.inStock} 
              onCheckedChange={(checked) => 
                handleCheckboxChange('inStock', checked as boolean)
              } 
            />
            <Label htmlFor="inStock">In Stock</Label>
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end pt-6">
        <Button 
          type="submit" 
          className="bg-fashion-primary hover:bg-fashion-primary/90"
          disabled={loading}
        >
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save Product'}
        </Button>
      </div>
    </form>
  </div>
  );
};

export default AdminProductFormPage;
