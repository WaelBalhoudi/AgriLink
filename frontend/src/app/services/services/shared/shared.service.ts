import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
declare var bootstrap: any;


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private spinner:NgxSpinnerService,

  ) { }
  // Success handler – optionally accepts a message and a form to reset
  handleSuccess(message: string = "Operation successful!", form?: NgForm) {
    this.spinner.hide();
    Swal.fire({
      title: "Good job!",
      text: message,
      icon: "success"
    }).then(() => {
      if (form) {
        form.resetForm(); // Reset the form after success if provided
      }
    });
  }

  // Error handler – accepts an optional custom error message
  handleError(error: any, form?: NgForm) {
  this.spinner.hide();
  const userMessage = this.extractErrorMessage(error);

  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: userMessage,
    confirmButtonText: "OK"
  }).then(() => {
    if (form) {
      form.resetForm(); // Optional: reset form on error too, if needed
    }
  });
}

  extractErrorMessage(error: any): string {
  // Default fallback message
  let message = "Something went wrong! Please try again later.";

  if (error.error instanceof ErrorEvent) {
    // Client-side or network error
    message = "Network error: Please check your connection.";
  } else if (error.status === 400) {
    // Bad Request – e.g., validation errors
    message = error.error?.message || "Invalid input. Please check your data.";
  } else if (error.status === 401) {
    // Unauthorized – e.g., wrong credentials
    message = error.error?.message || "Invalid email or password.";
  } else if (error.status === 403) {
    // Forbidden
    message = "Access denied. You don't have permission to do this.";
  } else if (error.status === 404) {
    // Not Found
    message = "The requested resource was not found.";
  } else if (error.status === 409) {
    // Conflict – e.g., email already exists
    message = error.error?.message || "This email is already registered.";
  } else if (error.status === 500) {
    // Internal Server Error
    message = error.error.error || "Server error. Please try again later.";
  } else if (error.error?.message) {
    // Try to use the message from the backend if available
    message = error.error.message;
  }

  return message;
  }

openModal(id: string) {
  console.log("from open modal fucntion ")
  const modalElement = document.getElementById(id);
  console.log(modalElement)
  if (modalElement) {
    console.log("yes")
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
    console.log("no")

}

closeModal(id: string) {
  
  const modalElement = document.getElementById(id);
  if (modalElement) {
    
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      
      modal.hide();
    }
   
  }
}
}
