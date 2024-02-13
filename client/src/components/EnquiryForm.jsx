import React from "react";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";

export default function EnquiryForm() {
  return (
    <div className="container mx-auto px-4 py-8">
      <form className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <Label htmlFor="course">Course</Label>
          <Select name="course" id="course" className="form-select">
            <option value="UPSC Civil Services">UPSC Civil Services</option>
            <option value="State PCS">State PCS</option>
            <option value="CSAT">CSAT (Civil Services Aptitude Test)</option>
            <option value="Optional">Optional</option>
            <option value="Essay Writing">Essay Writing</option>
            <option value="Writing Ability Test">Writing Ability Test</option>
            <option value="Interview">Interview</option>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <TextInput
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            required
            className="form-input"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <TextInput
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            required
            className="form-input"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="mobile">Phone</Label>
          <TextInput
            type="tel"
            name="mobile"
            id="mobile"
            placeholder="Enter your phone number"
            required
            className="form-input"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="branch">Branch</Label>
          <Select name="branch" id="branch" className="form-select">
            <option value="">Select Branch</option>
            <option value="Delhi (Hauz Khas)">Delhi (Hauz Khas)</option>
            <option value="Gurgaon (Sector 14)">Gurgaon (Sector 14)</option>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="pincode">Pin code</Label>
          <TextInput
            type="number"
            name="pincode"
            id="pincode"
            placeholder="Enter your pin code"
            required
            className="form-input"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="message">Message</Label>
          <Textarea
            name="message"
            id="message"
            rows="2"
            placeholder="Enter your message"
            className="form-textarea"
          ></Textarea>
        </div>
        <div className="mb-4">
          <TextInput
            id="pageSource"
            name="pageSource"
            type="hidden"
            value="HomePage"
          />
        </div>
        <div className="mb-4">
          <Button type="submit" className="btn btn-primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
