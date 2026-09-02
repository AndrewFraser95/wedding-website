import { useEffect, useRef, useState } from "react";
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
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

interface LostAndFoundItem {
  id: string;
  status: "lost" | "found";
  itemName: string;
  description?: string;
  reporterName: string;
  contact?: string;
  // Not settable from the public form — added manually (e.g. via the
  // Firestore console) once Andrew/Charley have photos of found items.
  photoUrl?: string;
  createdAt: number;
}

const formSchema = z.object({
  status: z.enum(["lost", "found"]),
  itemName: z.string().min(1, "Please describe the item"),
  description: z.string().optional(),
  reporterName: z.string().min(1, "Your name is required"),
  contact: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function LostAndFound() {
  const [items, setItems] = useState<LostAndFoundItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);
  // When set, submitting the form resolves (updates) this existing lost
  // item instead of creating a new document — avoids leaving the original
  // "lost" card behind and stops the same item being reported found twice.
  const [resolvingItemId, setResolvingItemId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const itemsQuery = query(
      collection(db, "lost-and-found"),
      orderBy("createdAt", "desc"),
    );
    const unsubscribe = onSnapshot(
      itemsQuery,
      (snapshot) => {
        setItems(
          snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<LostAndFoundItem, "id">),
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
    defaultValues: {
      status: "lost",
      itemName: "",
      description: "",
      reporterName: "",
      contact: "",
    },
  });

  const handleFoundThis = (item: LostAndFoundItem) => {
    setResolvingItemId(item.id);
    form.reset({
      status: "found",
      itemName: item.itemName,
      description: `Found this — originally reported lost by ${item.reporterName}.`,
      reporterName: "",
      contact: "",
    });
    setShowForm(true);
    // Let the form render before scrolling to it
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const openBlankForm = () => {
    const next = !showForm;
    setShowForm(next);
    if (next) {
      // Opening the general form (not via "Found this?") always starts a
      // brand new item, never resolves whatever was last clicked.
      setResolvingItemId(null);
      form.reset({
        status: "lost",
        itemName: "",
        description: "",
        reporterName: "",
        contact: "",
      });
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      if (resolvingItemId) {
        // Mark the original lost item as found in place, rather than
        // leaving it as "lost" and adding a separate "found" entry — that
        // was letting the same item be reported found more than once.
        await updateDoc(doc(db, "lost-and-found", resolvingItemId), {
          status: "found",
          itemName: values.itemName,
          description: values.description || "",
          reporterName: values.reporterName,
          contact: values.contact || "",
          foundAt: Date.now(),
        });
      } else {
        await addDoc(collection(db, "lost-and-found"), {
          status: values.status,
          itemName: values.itemName,
          description: values.description || "",
          reporterName: values.reporterName,
          contact: values.contact || "",
          createdAt: Date.now(),
        });
      }

      form.reset();
      setResolvingItemId(null);
      setShowForm(false);
      setShowModal(true);
    } catch (e) {
      console.error("Error saving lost & found item: ", e);
      alert("There was an error submitting your item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-16 pb-10 bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7]">
        <div className="w-full max-w-3xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg">
          {/* Header */}
          <div className="mb-8 flex flex-col items-center">
            <h1
              className="text-4xl md:text-5xl font-bold text-[#b5835d] mb-2 tracking-wider"
              style={{
                fontFamily: "Playwrite AU QLD, cursive",
                letterSpacing: "0.08em",
              }}
            >
              Lost & Found
            </h1>
            <p
              className="text-[#e9c46a] font-semibold text-lg text-center"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              Missing something, or found something that isn't yours?
            </p>
          </div>

          {/* Items list */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div
                className="text-[#b5835d] text-lg"
                style={{ fontFamily: "Playwrite AU QLD, cursive" }}
              >
                Loading items...
              </div>
            </div>
          )}

          {!loading && items.length === 0 && (
            <p
              className="text-[#7c4f2c] text-lg text-center mb-8"
              style={{ fontFamily: "Playwrite AU QLD, cursive" }}
            >
              Nothing reported yet — be the first to add a lost or found
              item below.
            </p>
          )}

          {!loading && items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {items.map((item) => {
                const isLost = item.status === "lost";
                return (
                  <div
                    key={item.id}
                    role={isLost ? "button" : undefined}
                    tabIndex={isLost ? 0 : undefined}
                    onClick={isLost ? () => handleFoundThis(item) : undefined}
                    onKeyDown={
                      isLost
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleFoundThis(item);
                            }
                          }
                        : undefined
                    }
                    className={`bg-white rounded-xl shadow-md border border-[#e9c46a]/20 p-4 flex flex-col text-left ${
                      isLost
                        ? "cursor-pointer hover:shadow-lg hover:border-[#e9c46a]/60 transition"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          isLost
                            ? "bg-[#f9e7e7] text-[#c05c5c]"
                            : "bg-[#e6f4ea] text-[#3f8b52]"
                        }`}
                      >
                        {isLost ? "Lost" : "Found"}
                      </span>
                    </div>
                    {item.photoUrl && (
                      <img
                        src={item.photoUrl}
                        alt={item.itemName}
                        className="w-full h-40 object-cover rounded-lg mb-3 border border-[#e9c46a]/20"
                      />
                    )}
                    <h3
                      className="text-lg font-bold text-[#b5835d] mb-1"
                      style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                    >
                      {item.itemName}
                    </h3>
                    {item.description && (
                      <p className="text-[#7c4f2c] text-sm mb-2">
                        {item.description}
                      </p>
                    )}
                    <p className="text-[#7c4f2c] text-sm mt-auto">
                      Reported by {item.reporterName}
                      {item.contact ? ` · ${item.contact}` : ""}
                    </p>
                    {isLost && (
                      <p className="text-[#e9c46a] text-xs font-semibold mt-2">
                        Found this? Tap to report it →
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Collapsible add-item form */}
          <div className="flex justify-center mb-4">
            <Button
              type="button"
              onClick={openBlankForm}
              className="rounded-full px-8 py-3 bg-[#e9c46a] text-[#fff8f0] font-semibold text-lg shadow-md hover:bg-[#b5835d] transition"
              style={{
                fontFamily: "Playwrite AU QLD, cursive",
                letterSpacing: "0.04em",
              }}
            >
              {showForm ? "Close form" : "Report a lost or found item"}
            </Button>
          </div>

          {showForm && (
            <div
              ref={formRef}
              className="bg-[#e9c46a]/10 rounded-2xl p-6 border border-[#e9c46a]/30 animate-fade-in-down"
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                  style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}
                >
                  {resolvingItemId ? (
                    <p className="text-[#b5835d] font-semibold">
                      Reporting this item as found — it'll be marked found
                      for everyone once you submit.
                    </p>
                  ) : (
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#b5835d] font-semibold">
                            Is this item lost or found?
                          </FormLabel>
                          <FormControl>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 text-[#7c4f2c]">
                                <input
                                  type="radio"
                                  value="lost"
                                  checked={field.value === "lost"}
                                  onChange={() => field.onChange("lost")}
                                />
                                I've lost something
                              </label>
                              <label className="flex items-center gap-2 text-[#7c4f2c]">
                                <input
                                  type="radio"
                                  value="found"
                                  checked={field.value === "found"}
                                  onChange={() => field.onChange("found")}
                                />
                                I've found something
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="itemName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#b5835d] font-semibold">
                          Item
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Silver hoop earring"
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#b5835d] font-semibold">
                          Details (optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Where/when, and any other details"
                            {...field}
                            className="rounded-xl border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reporterName"
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
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#b5835d] font-semibold">
                          Contact info (optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Phone or email so people can reach you"
                            {...field}
                            className="rounded-full border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
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
                  Your item has been added to the list.
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
