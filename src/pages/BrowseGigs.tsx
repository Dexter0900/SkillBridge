import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gigs, categories, skills } from '../data/dummyData';
import { FiSearch, FiFilter, FiX, FiDollarSign, FiClock, FiTag } from 'react-icons/fi';
import Button from '../components/ui/Button';

const BrowseGigs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredGigs, setFilteredGigs] = useState(gigs);
  
  // Apply filters when any filter changes
  useEffect(() => {
    let results = gigs;
    
    // Apply search term filter
    if (searchTerm) {
      results = results.filter(gig => 
        gig.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        gig.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(gig => selectedCategories.includes(gig.category));
    }
    
    // Apply skills filter
    if (selectedSkills.length > 0) {
      results = results.filter(gig => 
        gig.skills.some(skill => selectedSkills.includes(skill))
      );
    }
    
    // Apply price range filter
    results = results.filter(gig => 
      gig.budget >= priceRange[0] && gig.budget <= priceRange[1]
    );
    
    setFilteredGigs(results);
  }, [searchTerm, selectedCategories, selectedSkills, priceRange]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedSkills([]);
    setPriceRange([0, 2000]);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse Available Gigs</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find the perfect gig to match your skills and interests. Apply to work with employers on exciting projects.
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="form-input pl-10 w-full"
                placeholder="Search for gigs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              leftIcon={<FiFilter />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                  onClick={clearFilters}
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FiTag className="mr-2" /> Categories
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary-500 rounded"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                        />
                        <span className="ml-2 text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Skills */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {skills.slice(0, 15).map((skill) => (
                      <label key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary-500 rounded"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => handleSkillToggle(skill)}
                        />
                        <span className="ml-2 text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FiDollarSign className="mr-2" /> Budget Range
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">${priceRange[0]}</span>
                      <span className="text-sm text-gray-600">${priceRange[1]}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="text-xs text-gray-500">Min</label>
                        <input
                          type="number"
                          min="0"
                          max={priceRange[1]}
                          value={priceRange[0]}
                          onChange={(e) => handlePriceChange(e, 0)}
                          className="form-input w-full mt-1"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-gray-500">Max</label>
                        <input
                          type="number"
                          min={priceRange[0]}
                          max="2000"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                          className="form-input w-full mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Applied Filters */}
              {(selectedCategories.length > 0 || selectedSkills.length > 0) && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Applied Filters:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(category => (
                      <div key={category} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center">
                        {category}
                        <button 
                          onClick={() => handleCategoryToggle(category)}
                          className="ml-2 text-primary-500 hover:text-primary-700"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {selectedSkills.map(skill => (
                      <div key={skill} className="bg-secondary-50 text-secondary-700 px-3 py-1 rounded-full text-sm flex items-center">
                        {skill}
                        <button 
                          onClick={() => handleSkillToggle(skill)}
                          className="ml-2 text-secondary-500 hover:text-secondary-700"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-medium">{filteredGigs.length}</span> gigs
          </p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Sort by:</span>
            <select className="form-input py-2 px-3">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="budget-high">Budget: High to Low</option>
              <option value="budget-low">Budget: Low to High</option>
            </select>
          </div>
        </div>
        
        {/* Gigs Grid */}
        {filteredGigs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs.map((gig) => (
              <Link key={gig.id} to={`/gigs/${gig.id}`} className="block">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{gig.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        gig.status === 'open' 
                          ? 'bg-green-100 text-green-800' 
                          : gig.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {gig.status.charAt(0).toUpperCase() + gig.status.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{gig.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {gig.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                      {gig.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{gig.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center">
                        <img 
                          src={gig.employer.avatar || 'https://via.placeholder.com/40'} 
                          alt={gig.employer.name} 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-700">{gig.employer.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-700">
                          <FiDollarSign className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">${gig.budget}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <FiClock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{gig.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FiSearch className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No gigs found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any gigs matching your search criteria.
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseGigs;