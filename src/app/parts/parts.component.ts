import { Component } from '@angular/core';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.css'],
})
export class PartsComponent {
  selectedPart: string | null = null;
  searchQuery: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  page: number = 1; // Current page
  pageSize: number = 10; // Number of items per page

  parts = [
    {
      name: 'BAL-SEAL',
      code: 'NLC01010051',
      make: 'General',
      min: 1,
      max: 2,
      quantity: 2,
      location: 'R6-D4-A3',
    },
    {
      name: 'BLOCK B GUIDE',
      code: 'NLC01010148',
      make: 'General',
      min: 1,
      max: 2,
      quantity: 1,
      location: 'R6-D4-A6',
    },
    {
      name: 'JOINT NUT',
      code: 'NLC01010157',
      make: 'General',
      min: 1,
      max: 2,
      quantity: 2,
      location: 'R6-D4-D6',
    },
    {
      name: 'MIXING CHAMBER FIVE - BLADE',
      code: 'NLC01010040',
      make: 'General',
      min: 1,
      max: 2,
      quantity: 2,
      location: 'R6-D4-B3',
    },
    {
      name: 'RATIOPIN',
      code: 'NLC01010145',
      make: 'General',
      min: 1,
      max: 2,
      quantity: 1,
      location: 'R6-D4-E6',
    },
    {
      name: '8 Tube',
      code: 'NLC01010117',
      make: 'General',
      min: 1,
      max: 2,
      quantity: 1,
      location: 'R6-D4-E3',
    },
    {
      name: '8.0 Female adaptor',
      code: 'NLC01010130',
      make: 'General',
      min: 2,
      max: 4,
      quantity: 2,
      location: 'R6-D3-B3',
    },
    {
      name: '8.0 Male Adaptor',
      code: 'NLC01010132',
      make: 'Consumable',
      min: 2,
      max: 4,
      quantity: 3,
      location: 'R6-D3-C3',
    },
    {
      name: '8.0 v Packing',
      code: 'NLC01010112',
      make: 'General',
      min: 1,
      max: 2,
      quantity: 2,
      location: 'R6-D3-F3',
    },
    {
      name: 'Ball seal (Spring Housing)',
      code: 'NLC01010028',
      make: 'Consumable',
      min: 1,
      max: 2,
      quantity: 2,
      location: 'R6-D4-A4',
    },
  ];

  // Capture selected part from dropdown
  selectPart(part: string | null) {
    this.selectedPart = part;
    this.page = 1; // Reset to the first page when changing the selection
  }

  // Function to toggle sorting
  sortTable(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.page = 1; // Reset to the first page after sorting
  }

  // Get the class for the sort icon based on the current column and direction
  getSortIcon(column: string) {
    if (this.sortColumn === column) {
      return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
    } else {
      return 'fa-sort'; // Default unsorted state
    }
  }

  // Sorting logic for the table
  getSortedParts(parts: any[]) {
    if (!this.sortColumn) {
      return parts; // No sorting applied
    }

    return parts.sort((a, b) => {
      const valueA = a[this.sortColumn];
      const valueB = b[this.sortColumn];

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  // Filter parts based on selected part and search query
  filteredParts() {
    let filtered = this.parts;

    // Filter by selected part if one is selected
    if (this.selectedPart) {
      filtered = filtered.filter((part) => part.name === this.selectedPart);
    }

    // Filter by search query
    if (this.searchQuery) {
      const lowerSearchQuery = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (part) =>
          part.name.toLowerCase().includes(lowerSearchQuery) ||
          part.code.toLowerCase().includes(lowerSearchQuery) ||
          part.make.toLowerCase().includes(lowerSearchQuery) ||
          part.location.toLowerCase().includes(lowerSearchQuery)
      );
    }

    // Apply sorting
    return this.getSortedParts(filtered);
  }

  // Get paginated parts
  paginatedParts() {
    const filtered = this.filteredParts();
    const startIndex = (this.page - 1) * this.pageSize;
    return filtered.slice(startIndex, startIndex + this.pageSize);
  }

  // Get total number of pages
  totalPages() {
    return Math.ceil(this.filteredParts().length / this.pageSize);
  }

  // Change the current page
  changePage(newPage: number) {
    if (newPage > 0 && newPage <= this.totalPages()) {
      this.page = newPage;
    }
  }
}
