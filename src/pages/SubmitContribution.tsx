import { useForm } from "react-hook-form";
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
import { Button } from "../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Layout from "../components/Layout";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export default function SubmitContribution() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    title: z.string().min(1, "Title is required"),
    message: z.string().min(1, "Message is required"),
  });

  type ContributionFormValues = z.infer<typeof formSchema>;

  const form = useForm<ContributionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContributionFormValues) => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...values,
        submittedAt: new Date().toISOString(),
        timestamp: Date.now(),
      };

      await addDoc(collection(db, "contributions"), submissionData);

      setShowModal(true);
      form.reset();
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("There was an error submitting your contribution. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Submit
          </h1>
          <p
            className="text-[#7c4f2c] text-lg mb-8 font-medium"
            style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
          >
            We'd love to hear your favorite recipes, pieces of advice, or jokes! Your contributions will help us create a special keepsake.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#b5835d] font-semibold" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                      Your Name
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
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#b5835d] font-semibold" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Best Chocolate Cake Recipe / Marriage Advice / A Knock-Knock Joke"
                        {...field}
                        className="rounded-full border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
                        style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#b5835d] font-semibold" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your recipe, advice, or joke here..."
                        {...field}
                        className="rounded-xl border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80 min-h-[200px]"
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
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>

          {showModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 font-sans" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[#e9c46a]/30 flex flex-col items-center">
                <h2
                  className="text-2xl font-bold text-[#b5835d] mb-4 text-center"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  Thank you!
                </h2>
                <p
                  className="text-[#7c4f2c] text-center mb-6"
                  style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                >
                  Your contribution has been received. We can't wait to read it!
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 rounded-full bg-[#e9c46a] text-white font-semibold text-lg shadow hover:bg-[#b5835d] transition"
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
}
