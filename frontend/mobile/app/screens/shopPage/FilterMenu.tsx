import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Animated } from 'react-native';
import PriceRangeSlider from './PriceRangeSlider';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75; // 75% of screen width

interface FilterMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ isVisible, onClose }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ low: 0, high: 25000 });

  const slideAnim = useMemo(() => new Animated.Value(SIDEBAR_WIDTH), []);

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible, slideAnim]);

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  }, []);

  const toggleSelection = useCallback((item: string, selectedItems: string[], setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>) => {
    setSelectedItems(prev => 
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  }, []);

  const handlePriceRangeChange = useCallback((low: number, high: number) => {
    setPriceRange({ low, high });
  }, []);

  const FilterSection = useMemo(() => {
    return ({ title, children }: { title: string, children: React.ReactNode }) => {
      const isExpanded = expandedSections.includes(title);
      return (
        <View style={styles.section}>
          <Pressable style={styles.sectionHeader} onPress={() => toggleSection(title)}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.chevron}>{isExpanded ? '▲' : '▼'}</Text>
          </Pressable>
          {isExpanded && children}
        </View>
      );
    };
  }, [expandedSections, toggleSection]);

  const SelectableItem = useMemo(() => {
    return ({ item, isSelected, onToggle }: { item: string, isSelected: boolean, onToggle: () => void }) => (
      <Pressable
        style={[styles.selectableItem, isSelected && styles.selectedItem]}
        onPress={onToggle}
      >
        <Text style={[styles.selectableItemText, isSelected && styles.selectedItemText]}>{item}</Text>
      </Pressable>
    );
  }, []);

  const CategoryItem = useMemo(() => {
    return ({ item, isSelected, onToggle }: { item: string, isSelected: boolean, onToggle: () => void }) => (
      <Pressable
        style={styles.categoryItem}
        onPress={onToggle}
      >
        <Text style={[styles.categoryItemText, isSelected && styles.selectedCategoryItemText]}>{item}</Text>
      </Pressable>
    );
  }, []);

  const womenCategories = [
    'New Arrivals',
    'Casual Wear',
    'Office Wear',
    'Party Wear',
    'Plus Size',
    'Sport Wear',
    'Swimming Wear',
    'Nightwear & Lingerie',
    'Maternity Wear'
  ];

  const menCategories = [
    'New Arrivals',
    'Formal Wear',
    'Casual Wear',
    'Plus Size',
    'Sportswear',
    'Undergarments'
  ];

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Filter</Text>
          <Pressable onPress={onClose}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.content}>
          <FilterSection title="Category">
            <View style={styles.categoryContent}>
              <CategoryItem
                item="Women"
                isSelected={selectedCategories.includes('Women')}
                onToggle={() => toggleSelection('Women', selectedCategories, setSelectedCategories)}
              />
              {selectedCategories.includes('Women') && (
                <View style={styles.subCategoryContent}>
                  {womenCategories.map((category) => (
                    <CategoryItem
                      key={category}
                      item={category}
                      isSelected={selectedCategories.includes(category)}
                      onToggle={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
                    />
                  ))}
                </View>
              )}
              <CategoryItem
                item="Men"
                isSelected={selectedCategories.includes('Men')}
                onToggle={() => toggleSelection('Men', selectedCategories, setSelectedCategories)}
              />
              {selectedCategories.includes('Men') && (
                <View style={styles.subCategoryContent}>
                  {menCategories.map((category) => (
                    <CategoryItem
                      key={category}
                      item={category}
                      isSelected={selectedCategories.includes(category)}
                      onToggle={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
                    />
                  ))}
                </View>
              )}
            </View>
          </FilterSection>
          <FilterSection title="Size">
            <View style={styles.sizeContent}>
              {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', 'Free Size', 'UK 4', 'UK 6', 'UK 8'].map((size) => (
                <SelectableItem
                  key={size}
                  item={size}
                  isSelected={selectedSizes.includes(size)}
                  onToggle={() => toggleSelection(size, selectedSizes, setSelectedSizes)}
                />
              ))}
            </View>
          </FilterSection>
          <FilterSection title="Material">
            <View style={styles.materialContent}>
              {['Canvas', 'Chiffon', 'Corduroy', 'Cotton', 'Denim', 'Embroidery', 'Fabric', 'Knitwear', 'Lace', 'Linen', 'Nylon', 'Polyester', 'Rib knit', 'Sequins', 'Silk', 'Suedette', 'Tweed', 'Viscose'].map((material) => (
                <SelectableItem
                  key={material}
                  item={material}
                  isSelected={selectedMaterials.includes(material)}
                  onToggle={() => toggleSelection(material, selectedMaterials, setSelectedMaterials)}
                />
              ))}
            </View>
          </FilterSection>
          <FilterSection title="Price Range (LKR)">
            <View style={styles.priceContent}>
              <PriceRangeSlider
                min={0}
                max={25000}
                onChange={handlePriceRangeChange}
              />
            </View>
          </FilterSection>
        </ScrollView>
        <View style={styles.footer}>
          <Pressable style={styles.applyButton} onPress={onClose}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#321919',
  },
  content: {
    flex: 1,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#321919',
  },
  chevron: {
    fontSize: 16,
    color: '#321919',
  },
  closeIcon: {
    fontSize: 24,
    color: '#321919',
  },
  categoryContent: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  subCategoryContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  sizeContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  materialContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  priceContent: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  footer: {
    padding: 20,
  },
  applyButton: {
    backgroundColor: '#F97C7C',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectableItem: {
    backgroundColor: '#DADADA',
    borderRadius: 2,
    padding: 8,
    margin: 5,
  },
  selectedItem: {
    backgroundColor: '#FFE2E6',
  },
  selectableItemText: {
    fontSize: 14,
    color: '#898989',
  },
  selectedItemText: {
    color: '#F97C7C',
  },
  categoryItem: {
    padding: 8,
    margin: 5,
  },
  categoryItemText: {
    fontSize: 16,
    color: '#898989',
    fontFamily: 'Inter-Regular',
  },
  selectedCategoryItemText: {
    color: '#F97C7C',
    fontWeight: 'bold',
  },
});

export default FilterMenu;

