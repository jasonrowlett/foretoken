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
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Users, DollarSign, FileText, Calendar } from "lucide-react";

const consultingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  organizationName: z.string().min(1, "Organization name is required"),
  phoneNumber: z.string().optional(),
  companyWebsite: z.string().optional(),
  consultingArea: z.enum([
    "mica-compliance",
    "dora-regulation",
    "rwa-tokenization",
    "investor-education",
    "rwa-market-data",
    "regulatory-mapping"
  ], {
    required_error: "Please select a consulting area",
  }),
  projectDescription: z.string().min(1, "Project description is required"),
  preferredStartDate: z.string().min(1, "Preferred start date is required"),
  projectTimeline: z.string().min(1, "Project timeline is required"),
  additionalNotes: z.string().optional(),
});

type ConsultingFormValues = z.infer<typeof consultingSchema>;

const consultingAreas = [
  { value: "mica-compliance", label: "MiCA compliance & strategy" },
  { value: "dora-regulation", label: "DORA regulation & system audit prep" },
  { value: "rwa-tokenization", label: "RWA tokenization (launch strategy)" },
  { value: "investor-education", label: "Investor education or brand positioning" },
  { value: "rwa-market-data", label: "RWA market data & performance analysis" },
  { value: "regulatory-mapping", label: "Regulatory mapping (EU/US)" },
];

export default function Consulting() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ConsultingFormValues>({
    resolver: zodResolver(consultingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      organizationName: "",
      phoneNumber: "",
      companyWebsite: "",
      projectDescription: "",
      preferredStartDate: "",
      projectTimeline: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (values: ConsultingFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("/api/consulting", {
        method: "POST",
        body: JSON.stringify(values),
      });
      
      toast({
        title: "Consulting Request Submitted",
        description: "Thank you for your interest! We'll be in touch within 24 hours to discuss your project.",
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
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Consulting Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Hire Jason as a trusted advisor for your tokenization project, regulatory strategy, or investor education. 
            Leverage his deep expertise at the intersection of crypto markets, European regulation, and traditional asset infrastructure.
          </p>
        </div>

        {/* Services Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="text-center pb-4">
              <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <CardTitle className="text-lg">Regulatory Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">MiCA & DORA compliance, EU/US regulatory mapping</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="text-center pb-4">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <CardTitle className="text-lg">RWA Tokenization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">Launch strategy, market positioning, technical guidance</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="text-center pb-4">
              <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <CardTitle className="text-lg">Market Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">Performance analysis, investor education, brand positioning</p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Information */}
        <Card className="bg-gray-900 border-gray-700 mb-12">
          <CardHeader className="text-center">
            <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <CardTitle className="text-2xl">Pricing</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-3xl font-bold text-green-400 mb-2">Starting at $200/hour</p>
            <p className="text-gray-400">Custom proposals available for larger projects or retainer-based engagements</p>
          </CardContent>
        </Card>

        {/* Consulting Form */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl">Request Consulting Services</CardTitle>
            <CardDescription className="text-gray-400">
              Tell us about your project and we'll create a custom proposal for your needs.
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

                <FormField
                  control={form.control}
                  name="companyWebsite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Website (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="https://your-company.com" className="bg-gray-800 border-gray-600" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consultingArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consulting Area *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-800 border-gray-600">
                            <SelectValue placeholder="Select your area of interest" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {consultingAreas.map((area) => (
                            <SelectItem key={area.value} value={area.value}>
                              {area.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Please describe your project, goals, and specific areas where you need consulting support"
                          className="bg-gray-800 border-gray-600 min-h-[120px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="preferredStartDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Start Date *</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" className="bg-gray-800 border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectTimeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Timeline *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 3 months, 6 weeks, ongoing" className="bg-gray-800 border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="additionalNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Budget considerations, specific deliverables, or any other relevant information"
                          className="bg-gray-800 border-gray-600" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                >
                  {isSubmitting ? "Submitting..." : "Submit Consulting Request"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Process Information */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Our Process</h3>
          <div className="space-y-3 text-gray-300">
            <p>• Initial consultation to understand your specific needs and objectives</p>
            <p>• Custom proposal with scope, timeline, and pricing details</p>
            <p>• Regular check-ins and progress updates throughout the engagement</p>
            <p>• Deliverables tailored to your business requirements</p>
            <p>• Ongoing support and follow-up as needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}