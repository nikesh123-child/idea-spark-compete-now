
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Asset } from "@/data/assets";

const assetTypes: [Asset['type'], ...Asset['type'][]] = ["Database", "Server", "Application", "Domain"];
const riskLevels: [Asset['risk'], ...Asset['risk'][]] = ["Critical", "High", "Medium", "Low"];

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  type: z.enum(assetTypes),
  owner: z.string().min(1, { message: "Owner is required." }),
  risk: z.enum(riskLevels),
});

export type AddAssetFormValues = z.infer<typeof formSchema>;

interface AddAssetFormProps {
  onSubmit: (values: AddAssetFormValues) => void;
  onCancel: () => void;
}

export function AddAssetForm({ onSubmit, onCancel }: AddAssetFormProps) {
  const form = useForm<AddAssetFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      owner: "",
      type: "Application",
      risk: "Medium",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. prod-db-1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an asset type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {assetTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Infra Team" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="risk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Risk Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a risk level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {riskLevels.map(risk => <SelectItem key={risk} value={risk}>{risk}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Asset</Button>
        </div>
      </form>
    </Form>
  );
}
