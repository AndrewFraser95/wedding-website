import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import StyledButton from "./StyledButton";

const addressSchema = z.object({
  name: z.string().min(5, "Please enter a valid Name"),
  add1: z.string().min(5, "Please enter a valid Address Line 1"),
  add2: z.string().min(5, "Please enter a valid Address Line 2"),
  county: z.string().min(5, "Please enter a valid county"),
  postcode: z.string().min(5, "Please enter a valid postcode"),
});

type AddressForm = z.infer<typeof addressSchema>;

export default function EmailModal() {
  const form = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: { name: "", add1: "", add2: "", county: "", postcode: "" },
  });

  const [open, setOpen] = useState(false);

  async function onSubmit(values: AddressForm) {
    try {
      const response = await fetch("https://formspree.io/f/mqabzglg", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("Thanks for providing your address!");
        form.reset();
        setOpen(false);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Email signup error:", error);
      alert("Submission failed.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <StyledButton color="bg-red-500" style={{ height: "auto" }}>
          Provide your address <br /> for the formal invite!
        </StyledButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Provide your address for the formal invite!</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name(s)</FormLabel>
                  <FormControl>
                    <Input placeholder="Mr John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="add1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1:</FormLabel>
                  <FormControl>
                    <Input placeholder="64 West Wallaby Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="add2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2:</FormLabel>
                  <FormControl>
                    <Input placeholder="Sandford" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>County:</FormLabel>
                  <FormControl>
                    <Input placeholder="Yorkshire" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode:</FormLabel>
                  <FormControl>
                    <Input placeholder="YRU 2SE" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
