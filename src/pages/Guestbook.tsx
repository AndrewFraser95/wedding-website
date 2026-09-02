import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Layout from "../components/Layout";
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
import { db } from "../lib/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: number;
}

const formSchema = z.object({
  name: z.string().min(1, "Please let us know who you are!"),
  message: z.string().min(1, "Please leave us a message"),
});

type FormValues = z.infer<typeof formSchema>;

const PHOTO_DRIVE_URL =
  "https://drive.google.com/drive/folders/1u7g7NRPDJD8ee04d1m83Mxo1ujkGRprm?usp=sharing";

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const entriesQuery = query(
      collection(db, "guestbook"),
      orderBy("createdAt", "desc"),
    );
    const unsubscribe = onSnapshot(
      entriesQuery,
      (snapshot) => {
        setEntries(
          snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<GuestbookEntry, "id">),
          })),
        );
        setLoading(false);
      },
      () => setLoading(false),
    );
    return () => unsubscribe();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "guestbook"), {
        name: values.name,
        message: values.message,
        createdAt: Date.now(),
      });
      form.reset();
      setShowModal(true);
    } catch (e) {
      console.error("Error adding guestbook entry: ", e);
      alert("There was an error leaving your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-10 bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7]">
        <div className="w-full max-w-3xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg">
          {/* Header */}
          <div className="mb-6 flex flex-col items-center">
            <h1
              className="text-4xl md:text-5xl font-bold text-[#b5835d] mb-2 tracking-wider"
              style={{
                fontFamily: "Playwrite AU QLD, cursive",
                letterSpacing: "0.08em",
              }}
            >
              Guestbook
            </h1>
            <p
              className="text-[#e9c46a] font-semibold text-lg text-center"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              Thank you so much for celebrating with us!
            </p>
          </div>

          <div className="mb-10 text-center">
            <p
              className="text-[#7c4f2c] text-lg mb-3"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              Having you there meant the world to us — thank you for being
              part of our day.
            </p>
            <p
              className="text-[#7c4f2c] text-lg mb-4"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              If you took any photos, please upload them to our shared Google
              Drive so we can relive it all!
            </p>
            <a
              href={PHOTO_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-full bg-[#e9c46a] text-[#fff8f0] font-semibold text-lg shadow-md hover:bg-[#b5835d] transition"
              style={{
                fontFamily: "Playwrite AU QLD, cursive",
                letterSpacing: "0.04em",
              }}
            >
              Upload your photos to our Google Drive
            </a>
          </div>

          {/* Leave a message form */}
          <div className="bg-[#e9c46a]/10 rounded-2xl p-6 border border-[#e9c46a]/30 mb-10">
            <h2
              className="text-2xl font-bold text-[#b5835d] mb-4 text-center"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              Leave us a message
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#b5835d] font-semibold">
                        Your name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Toby Larone"
                          {...field}
                          className="rounded-full border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
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
                      <FormLabel className="text-[#b5835d] font-semibold">
                        Your message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share a memory, well-wishes, anything you like!"
                          {...field}
                          className="rounded-xl border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80 min-h-[120px]"
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
                    {isSubmitting ? "Submitting..." : "Sign the Guestbook"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Messages list */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div
                className="text-[#b5835d] text-lg"
                style={{ fontFamily: "Playwrite AU QLD, cursive" }}
              >
                Loading messages...
              </div>
            </div>
          )}

          {!loading && entries.length === 0 && (
            <p
              className="text-[#7c4f2c] text-lg text-center"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              No messages yet — be the first to sign the guestbook!
            </p>
          )}

          {!loading && entries.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-xl shadow-md border border-[#e9c46a]/20 p-4 flex flex-col text-left"
                >
                  <p className="text-[#7c4f2c] text-sm mb-3 whitespace-pre-wrap">
                    {entry.message}
                  </p>
                  <p
                    className="text-[#b5835d] font-semibold mt-auto"
                    style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                  >
                    — {entry.name}
                  </p>
                </div>
              ))}
            </div>
          )}

          {showModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[#e9c46a]/30 flex flex-col items-center">
                <h2
                  className="text-2xl font-bold text-[#b5835d] mb-4 text-center"
                  style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                >
                  Thank you!
                </h2>
                <p className="text-[#7c4f2c] text-center mb-6">
                  Your message has been added to the guestbook.
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
