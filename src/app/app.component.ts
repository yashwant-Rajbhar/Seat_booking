import { Component } from '@angular/core';

@Component({
  selector: 'app-root',  // Ensure this selector matches the one in index.html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Train Seat Booking';
  // Initial seat layout: 9 rows of 7 seats and 1 row of 3 seats
  seatLayout = Array.from({ length: 10 }, (_, rowIndex) => {
    if (rowIndex === 9) return Array(3).fill(false); // Last row with 3 seats
    return Array(7).fill(false); // Rows with 7 seats
  });

  seatsToBook: number = 1;
  error: string | null = null;

  // Function to book seats
  bookSeats() {
    this.error = null;  // Clear previous error

    // Validation: number of seats should be between 1 and 7
    if (this.seatsToBook < 1 || this.seatsToBook > 7) {
      this.error = 'Please enter a number between 1 and 7';
      return;
    }

    // Booking logic: try to book the required number of seats
    let seatsBooked = false;
    for (let row of this.seatLayout) {
      const availableSeats = row.filter(seat => !seat).length;
      if (availableSeats >= this.seatsToBook) {
        let booked = 0;
        for (let i = 0; i < row.length; i++) {
          if (!row[i]) {
            row[i] = true; // Mark the seat as booked
            booked++;
          }
          if (booked === this.seatsToBook) {
            seatsBooked = true;
            break;
          }
        }
      }
      if (seatsBooked) break;
    }

    if (!seatsBooked) {
      this.error = 'Unable to book seats, not enough available in a single row.';
    }
  }
}
