import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Layout from "@/components/Layout";

const rsvpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  allergens: z.string().optional(),
  songRequests: z.string().optional(),
  wantsToSpeak: z.boolean().optional(),
  suggestions: z.string().optional(),
});

type RSVPForm = z.infer<typeof rsvpSchema>;

export default function Rsvp() {
  const form = useForm<RSVPForm>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      email: "",
      allergens: "",
      songRequests: "",
      wantsToSpeak: false,
      suggestions: "",
    },
  });

  async function onSubmit(values: RSVPForm) {
    try {
      const response = await fetch("https://formspree.io/f/xnndzyrw", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("Thank you for your RSVP!");
        form.reset();
      } else {
        alert("Oops! Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("RSVP submission error:", error);
      alert("Submission failed. Please try again.");
    }
  }

  return (
    <Layout>
      <div className="min-h-screen text-center p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">RSVP</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white/80 p-6 rounded-md shadow-md"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Alex Morgan" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="alex@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allergens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies / Dietary Needs</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Let us know..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="songRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Song Requests</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What songs will get you dancing?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wantsToSpeak"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>
                    I'd like to give a speech (NB: This will be overlooked by
                    "The Dads")
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="suggestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suggestions for the day</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Anything else you'd like to share?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-lg">
              Submit RSVP
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
}
