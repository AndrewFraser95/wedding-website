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
import { Button } from "../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Layout from "../components/Layout";
import { db } from "../lib/firebase";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const PAGE_PASSWORD = "FraserFriday";

const personSchema = z.object({
  name: z.string().min(1, "Name is required"),
  arrivalTime: z.string().min(1, "Please let us know when you'll arrive"),
  order: z.string().optional(),
});

const formSchema = z.object({
  people: z.array(personSchema).min(1),
});

type FridayNightFormValues = z.infer<typeof formSchema>;

interface Preorder {
  id: string;
  name: string;
  arrivalTime: string;
  order?: string;
}

export default function FridayNight() {
  const [unlocked, setUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preorders, setPreorders] = useState<Preorder[]>([]);

  useEffect(() => {
    if (!unlocked) return;
    const preordersQuery = query(
      collection(db, "friday-night-preorders"),
      orderBy("timestamp", "asc"),
    );
    const unsubscribe = onSnapshot(preordersQuery, (snapshot) => {
      const allPeople = snapshot.docs.flatMap((docSnap) => {
        const data = docSnap.data();
        const people = Array.isArray(data.people) ? data.people : [];
        return people.map((person: Preorder, i: number) => ({
          id: `${docSnap.id}-${i}`,
          name: person.name,
          arrivalTime: person.arrivalTime,
          order: person.order,
        }));
      });
      setPreorders(allPeople);
    });
    return () => unsubscribe();
  }, [unlocked]);

  const form = useForm<FridayNightFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      people: [{ name: "", arrivalTime: "", order: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "people",
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PAGE_PASSWORD) {
      setUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const onSubmit = async (values: FridayNightFormValues) => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...values,
        submittedAt: new Date().toISOString(),
        timestamp: Date.now(),
      };

      await addDoc(collection(db, "friday-night-preorders"), submissionData);

      setShowModal(true);
      form.reset({ people: [{ name: "", arrivalTime: "", order: "" }] });
    } catch (e) {
      alert("There was an error submitting your preorder. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#fff8f0] via-[#fffbe9] to-[#f9e7e7] px-2 py-10 font-sans"
        style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}
      >
        <div className="w-full max-w-2xl bg-white/80 rounded-2xl shadow-2xl border border-[#e9c46a]/30 p-8 md:p-12 backdrop-blur-lg">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#b5835d] mb-8 tracking-wider"
            style={{
              fontFamily: "Playwrite AU QLD, cursive",
              letterSpacing: "0.08em",
            }}
          >
            Friday Night
          </h1>

          {!unlocked ? (
            <>
              <p
                className="text-[#7c4f2c] text-lg mb-8 font-medium"
                style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}
              >
                This page is password protected. Please enter the password to
                continue.
              </p>
              <form
                onSubmit={handlePasswordSubmit}
                className="flex flex-col items-center gap-4"
              >
                <Input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError(false);
                  }}
                  placeholder="Enter password"
                  className="rounded-full border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80 max-w-xs"
                  style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm">
                    Incorrect password, please try again.
                  </p>
                )}
                <Button
                  type="submit"
                  className="rounded-full px-10 py-3 bg-[#e9c46a] text-[#fff8f0] font-semibold text-lg shadow-lg hover:bg-[#b5835d] transition"
                  style={{
                    fontFamily: "Playwrite AU QLD, cursive",
                    letterSpacing: "0.04em",
                  }}
                >
                  Unlock
                </Button>
              </form>
            </>
          ) : (
            <>
              <p
                className="text-[#7c4f2c] text-lg mb-4 font-medium"
                style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}
              >
                On the Friday night before the wedding, we're getting a head
                start on the celebrations! Supper starts at{" "}
                <span className="font-semibold text-[#b5835d]">7pm</span>, and
                anyone who'd like to join us just for drinks is welcome from{" "}
                <span className="font-semibold text-[#b5835d]">8 / 8:30pm</span>
                .
              </p>
              <p
                className="text-[#7c4f2c] text-lg mb-4 font-medium"
                style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}
              >
                Unfortunately we won't be able to cover the cost of meals, but
                we'll be putting on drinks for everyone. If you'd like to join
                us for dinner or small plates, please preorder from the menu
                below so we can let the venue know numbers and choices in
                advance.
              </p>
              <p
                className="text-[#7c4f2c] text-lg mb-4 font-medium"
                style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}
              >
                Please let us know if you can attend by the 12th of August, so
                we can confirm numbers with the venue. If you have any dietary
                requirements, please let us know in the form below.
              </p>
              <a
                href="/assets/Signature All Day Menu - The Harrogate Inn (DIGITAL).pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-8 px-6 py-3 rounded-full bg-[#e9c46a]/20 text-[#b5835d] font-semibold shadow-sm hover:bg-[#e9c46a]/40 transition"
                style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}
              >
                View the Menu (PDF)
              </a>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-7"
                  style={{ fontFamily: "Inter, Segoe UI, Arial, sans-serif" }}
                >
                  <div className="flex flex-col gap-6">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex flex-col gap-4 p-4 rounded-2xl border border-[#e9c46a]/30 bg-white/60"
                      >
                        <FormField
                          control={form.control}
                          name={`people.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                className="text-[#b5835d] font-semibold"
                                style={{
                                  fontFamily:
                                    "Inter, Segoe UI, Arial, sans-serif",
                                }}
                              >
                                Guest {index + 1} Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Toby Larone"
                                  {...field}
                                  className="rounded-full border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
                                  style={{
                                    fontFamily:
                                      "Inter, Segoe UI, Arial, sans-serif",
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`people.${index}.arrivalTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                className="text-[#b5835d] font-semibold"
                                style={{
                                  fontFamily:
                                    "Inter, Segoe UI, Arial, sans-serif",
                                }}
                              >
                                What time will they arrive on Friday?
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. 7pm"
                                  {...field}
                                  className="rounded-full border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
                                  style={{
                                    fontFamily:
                                      "Inter, Segoe UI, Arial, sans-serif",
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`people.${index}.order`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                className="text-[#b5835d] font-semibold"
                                style={{
                                  fontFamily:
                                    "Inter, Segoe UI, Arial, sans-serif",
                                }}
                              >
                                What would they like to order? (leave blank if
                                just joining for drinks)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Burger, no onions"
                                  {...field}
                                  className="rounded-full border-[#e9c46a]/40 focus:border-[#e9c46a] bg-white/80"
                                  style={{
                                    fontFamily:
                                      "Inter, Segoe UI, Arial, sans-serif",
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            variant="destructive"
                            className="rounded-full self-start"
                            style={{
                              fontFamily: "Inter, Segoe UI, Arial, sans-serif",
                            }}
                          >
                            Remove Guest
                          </Button>
                        )}
                      </div>
                    ))}
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        onClick={() =>
                          append({ name: "", arrivalTime: "", order: "" })
                        }
                        variant="secondary"
                        className="rounded-full bg-[#e9c46a]/20 text-[#b5835d] hover:bg-[#e9c46a]/40"
                        style={{
                          fontFamily: "Inter, Segoe UI, Arial, sans-serif",
                        }}
                      >
                        Add Guest
                      </Button>
                    </div>
                  </div>
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
                      {isSubmitting ? "Submitting..." : "Submit Preorder"}
                    </Button>
                  </div>
                </form>
              </Form>

              {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 font-sans">
                  <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[#e9c46a]/30 flex flex-col items-center">
                    <h2
                      className="text-2xl font-bold text-[#b5835d] mb-4 text-center"
                      style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                    >
                      Thanks!
                    </h2>
                    <p
                      className="text-[#7c4f2c] text-center mb-4"
                      style={{
                        fontFamily: "Inter, Segoe UI, Arial, sans-serif",
                      }}
                    >
                      We've got your preorder and can't wait to see you on
                      Friday night!
                    </p>
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

              {preorders.length > 0 && (
                <div className="mt-10 text-left">
                  <h2
                    className="text-2xl font-bold text-[#b5835d] mb-4 text-center"
                    style={{ fontFamily: "Playwrite AU QLD, cursive" }}
                  >
                    Who's Coming Friday
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {preorders.map((person) => (
                      <li
                        key={person.id}
                        className="px-4 py-2 rounded-xl bg-[#e9c46a]/10 text-[#7c4f2c]"
                        style={{
                          fontFamily: "Inter, Segoe UI, Arial, sans-serif",
                        }}
                      >
                        <span className="font-semibold text-[#b5835d]">
                          {person.name}
                        </span>{" "}
                        - arriving {person.arrivalTime}
                        {person.order ? ` - ordering: ${person.order}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
