import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Layout from "../components/Layout";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export default function Rsvp() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // RSVP form schema
  const personSchema = z.object({
    name: z.string().min(1, "Name is required"),
  });
  const formSchema = z.object({
    people: z.array(personSchema).min(1),
    email: z.string().email(),
    allergens: z.string().optional(),
    songRequests: z.string().optional(),
    drinks: z.object({
      rose: z.boolean().optional(),
      white: z.boolean().optional(),
      red: z.boolean().optional(),
      beer: z.boolean().optional(),
    }),
    accessibilityNeeds: z.string().optional(),
    suggestions: z.string().optional(),
  });

  type RSVPFormValues = z.infer<typeof formSchema>;

  const form = useForm<RSVPFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      people: [{ name: "" }],
      email: "",
      allergens: "",
      songRequests: "",
      drinks: { rose: false, white: false, red: false, beer: false },
      accessibilityNeeds: "",
      suggestions: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "people",
  });

  // Drink preferences helpers
  const drinkPrefs = form.watch("drinks");
  const setValue = form.setValue;

  // Submit handler
  const onSubmit = async (values: RSVPFormValues) => {
    setIsSubmitting(true);
    try {
      // Add submission timestamp
      const submissionData = {
        ...values,
        submittedAt: new Date().toISOString(),
        timestamp: Date.now(),
      };

      // Save to Firebase
      await addDoc(collection(db, "rsvp-submissions"), submissionData);

      setShowModal(true);
      form.reset();
    } catch (e) {
      alert("There was an error submitting your RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = form.handleSubmit;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7] px-2 py-10 font-sans" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
        <div className="w-full max-w-2xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#b5835d] mb-2 tracking-wider"
            style={{
              fontFamily: "Playwrite AU QLD, cursive",
              letterSpacing: "0.08em",
            }}
          >
            RSVP
          </h1>
          <p
            className="text-[#7c4f2c] text-lg mb-8 font-medium"
            style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
          >
            We can't wait to celebrate with you! Please fill out the form below to let us know you'll be joining us.
          </p>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
              {/* People Section */}
              <div className="flex flex-col gap-4">
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`people.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#b5835d] font-semibold" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                          Guest {index + 1} Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Toby Larone"
                            {...field}
                            className="rounded-full border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
                            style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => append({ name: "" })}
                    variant="secondary"
                    className="rounded-full bg-[#e9c46a]/20 text-[#b5835d] hover:bg-[#e9c46a]/40"
                    style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                  >
                    Add Guest
                  </Button>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => remove(fields.length - 1)}
                      variant="destructive"
                      className="rounded-full"
                      style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#b5835d] font-semibold" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. john@gmail.com"
                        {...field}
                        className="rounded-full border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
                        style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Allergens */}
              <FormField
                control={form.control}
                name="allergens"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#b5835d] font-semibold" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                      Allergens or Dietary Restrictions
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. wheat"
                        {...field}
                        className="rounded-xl border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
                        rows={2}
                        style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Drinks Section */}
              <div>
                <FormLabel className="mb-2 block text-[#b5835d] font-semibold" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                  Table Drink Preference
                </FormLabel>
                <div className="flex flex-wrap gap-4">
                  {["rose", "white", "red", "beer"].map((drink) => (
                    <label
                      key={drink}
                      className="flex items-center gap-2 cursor-pointer bg-[#e9c46a]/10 px-4 py-2 rounded-full shadow-sm hover:bg-[#e9c46a]/20 transition"
                      style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                    >
                      <Checkbox
                        checked={drinkPrefs[drink as keyof RSVPFormValues["drinks"]]}
                        onCheckedChange={() =>
                          setValue(
                            `drinks.${drink}` as
                              | "drinks.rose"
                              | "drinks.white"
                              | "drinks.red"
                              | "drinks.beer",
                            !drinkPrefs[drink as keyof RSVPFormValues["drinks"]]
                          )
                        }
                        className="accent-[#e9c46a]"
                      />
                      <span className="capitalize" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>{drink}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Accessibility Needs */}
              <FormField
                control={form.control}
                name="accessibilityNeeds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#b5835d] font-semibold" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                      Mobility / Accessibility Needs
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. Seating needed"
                        {...field}
                        className="rounded-xl border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
                        rows={2}
                        style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Song Requests */}
              <FormField
                control={form.control}
                name="songRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#b5835d] font-semibold" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                      Song Requests
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. Toto - Africa"
                        {...field}
                        className="rounded-xl border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
                        rows={2}
                        style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Suggestions */}
              <FormField
                control={form.control}
                name="suggestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#b5835d] font-semibold" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                      Suggestions
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. Can I ask for X behind the bar"
                        {...field}
                        className="rounded-xl border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
                        rows={2}
                        style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full px-10 py-3 bg-[#e9c46a] text-[#fff8f0] font-semibold text-lg shadow-lg hover:bg-[#b5835d] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: "Playwrite AU QLD, cursive",
                    letterSpacing: "0.04em",
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit RSVP"}
                </Button>
              </div>
            </form>
          </Form>
          {/* Modal for post-RSVP message */}
          {showModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 font-sans" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[#e9c46a]/30 flex flex-col items-center">
                <svg
                  width="60"
                  height="24"
                  viewBox="0 0 60 24"
                  fill="none"
                  className="mb-2"
                >
                  <ellipse
                    cx="30"
                    cy="12"
                    rx="28"
                    ry="8"
                    fill="#e9c46a"
                    fillOpacity="0.13"
                  />
                  <ellipse
                    cx="30"
                    cy="12"
                    rx="20"
                    ry="3"
                    fill="#b5835d"
                    fillOpacity="0.10"
                  />
                </svg>
                <h2
                  className="text-2xl font-bold text-[#b5835d] mb-4 text-center"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  Thank you for your RSVP!
                </h2>
                <p
                  className="text-[#7c4f2c] text-center mb-4"
                  style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                >
                  We can't wait to celebrate with you!<br /><br />
                  As part of our wedding, we're creating a special keepsake cookbook and memory book.<br /><br />
                  <span className="font-semibold text-[#b5835d]">We would be truly grateful if you could send us:</span><br />
                  <ul className="list-disc list-inside text-left mx-auto max-w-xs mb-2">
                    <li><span className="font-semibold">A favourite family recipe</span> (definitely!)</li>
                    <li><span className="font-semibold">A piece of life advice</span> (would be wonderful)</li>
                    <li><span className="font-semibold">A joke</span> (optional, but always welcome!)</li>
                  </ul>
                  We'll print your recipe in our cookbook for you to sign at the wedding, and share your wisdom and humour as we start our new adventure together.<br /><br />
                  Please click below to draft your email and send your contributions by <span className="font-semibold">June 1st</span>:
                </p>
                <a
                  href="mailto:andrewandcharleywedding@gmail.com?subject=Wedding%20-%20Recipe,%20advice%20or%20jokes%20-%20send%20before%20July%201st"
                  className="inline-block px-6 py-3 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold text-lg shadow-md hover:bg-[#b5835d] transition mb-4"
                  style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                >
                  Create a draft email!
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-2 px-6 py-2 rounded-full bg-[#b5835d] text-white font-semibold text-lg shadow hover:bg-[#e9c46a] transition"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
  // ...existing code...
}
