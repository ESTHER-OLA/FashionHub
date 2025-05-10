"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductCategorySelectorProps {
  category: string;
  subCategory: string;
  gender: string;
  isNew: boolean;
  isSale: boolean;
  isFeatured?: boolean;
  onCategoryChange: (value: string) => void;
  onSubCategoryChange: (value: string) => void;
  onGenderChange: (value: "men" | "women" | "children" | "unisex") => void;
  onNewChange: (checked: boolean) => void;
  onSaleChange: (checked: boolean) => void;
  onFeaturedChange?: (checked: boolean) => void;
}

const ProductCategorySelector: React.FC<ProductCategorySelectorProps> = ({
  category,
  subCategory,
  gender,
  isNew,
  isSale,
  isFeatured = false,
  onCategoryChange,
  onSubCategoryChange,
  onGenderChange,
  onNewChange,
  onSaleChange,
  onFeaturedChange,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold border-b border-border pb-2">
        Categories & Display Options
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="category">Main Category *</Label>
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="children">Children</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="combos">Combos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="subCategory">Sub Category *</Label>
          <Select value={subCategory} onValueChange={onSubCategoryChange}>
            <SelectTrigger id="subCategory">
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              {category === "men" && (
                <>
                  <SelectItem value="shirts">Shirts</SelectItem>
                  <SelectItem value="pants">Pants</SelectItem>
                  <SelectItem value="suits">Suits</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </>
              )}
              {category === "women" && (
                <>
                  <SelectItem value="dresses">Dresses</SelectItem>
                  <SelectItem value="tops">Tops</SelectItem>
                  <SelectItem value="sweaters">Sweaters</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </>
              )}
              {category === "children" && (
                <>
                  <SelectItem value="t-shirts">T-shirts</SelectItem>
                  <SelectItem value="pants">Pants</SelectItem>
                  <SelectItem value="baby">Baby</SelectItem>
                </>
              )}
              {category === "sports" && (
                <>
                  <SelectItem value="footwear">Footwear</SelectItem>
                  <SelectItem value="activewear">Activewear</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </>
              )}
              {category === "corporate" && (
                <>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </>
              )}
              {category === "combos" && (
                <>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                </>
              )}
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={gender}
            onValueChange={(value) =>
              onGenderChange(value as "men" | "women" | "children" | "unisex")
            }
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="children">Children</SelectItem>
              <SelectItem value="unisex">Unisex</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Display Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isNew"
              checked={isNew}
              onCheckedChange={(checked) => onNewChange(checked as boolean)}
            />
            <Label htmlFor="isNew">New Arrival</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isSale"
              checked={isSale}
              onCheckedChange={(checked) => onSaleChange(checked as boolean)}
            />
            <Label htmlFor="isSale">On Sale</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isFeatured"
              checked={isFeatured}
              onCheckedChange={(checked) =>
                onFeaturedChange && onFeaturedChange(checked as boolean)
              }
            />
            <Label htmlFor="isFeatured">Featured Product</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategorySelector;
