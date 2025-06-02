import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mic, DollarSign, MapPin, Calendar } from "lucide-react";

const speakerBookingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  organizationName: z.string().min(1, "Organization name is required"),
  phoneNumber: z.string().optional(),
  eventLocation: z.string().min(1, "Event location is required"),
  eventDate: z.string().min(1, "Event date is required"),
  eventDescription: z.string().min(1, "Event description is required"),
  audienceSize: z.string().min(1, "Estimated audience size is required"),
  eventType: z.enum(["virtual", "in-person"], {
    required_error: "Please select event type",
  }),
  timeZone: z.string().min(1, "Time zone is required"),
  additionalNotes: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type SpeakerBookingFormValues = z.infer<typeof speakerBookingSchema>;

export default function SpeakerBooking() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<SpeakerBookingFormValues>({
    resolver: zodResolver(speakerBookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      organizationName: "",
      phoneNumber: "",
      eventLocation: "",
      eventDate: "",
      eventDescription: "",
      audienceSize: "",
      timeZone: "",
      additionalNotes: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (values: SpeakerBookingFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("/api/speaker-booking", {
        method: "POST",
        body: JSON.stringify(values),
      });
      
      toast({
        title: "Booking Request Submitted",
        description: "Thank you for your interest! We'll be in touch within 24 hours.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mic className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Speaker Booking
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Book Jason Rowlett for your next conference, panel, or executive briefing. Jason delivers 
            compelling insights on RWA tokenization, regulation, and crypto adoption for both traditional 
            and digital finance audiences.
          </p>
        </div>

        {/* Pricing Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <DollarSign className="w-5 h-5 text-green-400 mr-2" />
              <CardTitle className="text-lg">In-Person Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-400 mb-2">Starting at $2,500</p>
              <p className="text-sm text-gray-400">+ Travel & lodging covered by host</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <DollarSign className="w-5 h-5 text-blue-400 mr-2" />
              <CardTitle className="text-lg">Virtual Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-400 mb-2">$1,000 flat fee</p>
              <p className="text-sm text-gray-400">No travel required</p>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl">Book Jason for Your Event</CardTitle>
            <CardDescription className="text-gray-400">
              Fill out the form below and we'll get back to you within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-gray-800 border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" className="bg-gray-800 border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name *</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-gray-800 border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-gray-800 border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="eventLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Location *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="City, Country or Virtual" className="bg-gray-800 border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Date *</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" className="bg-gray-800 border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="eventDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Please describe your event, target audience, and speaking topics of interest"
                          className="bg-gray-800 border-gray-600 min-h-[100px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="audienceSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Audience Size *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 100-200 people" className="bg-gray-800 border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-800 border-gray-600">
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="virtual">Virtual</SelectItem>
                            <SelectItem value="in-person">In-Person</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="timeZone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Zone (for scheduling follow-ups) *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., UTC+1, EST, PST" className="bg-gray-800 border-gray-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Any special requirements, budget considerations, or additional information"
                          className="bg-gray-800 border-gray-600" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-600"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          I agree to the terms and conditions *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
                >
                  {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">What to Expect</h3>
          <div className="space-y-3 text-gray-300">
            <p>• All prices are negotiable depending on audience, budget, and partnership opportunities</p>
            <p>• Custom presentations and tailored topics may incur additional costs</p>
            <p>• We'll respond to your inquiry within 24 hours</p>
            <p>• Travel and lodging arrangements will be discussed during booking confirmation</p>
          </div>
        </div>
      </div>
    </div>
  );
}