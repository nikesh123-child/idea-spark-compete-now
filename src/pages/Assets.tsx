
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { assets as initialAssets, riskVariantMap, Asset } from "@/data/assets";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { AddAssetForm, AddAssetFormValues } from "@/components/AddAssetForm";
import { useToast } from "@/hooks/use-toast";

export default function Assets() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddAsset = (data: AddAssetFormValues) => {
    const newId = `ASSET-${String(assets.length + 1).padStart(3, "0")}`;
    const newAsset: Asset = {
      id: newId,
      ...data,
    };
    setAssets((prevAssets) => [...prevAssets, newAsset]);
    setIsDialogOpen(false);
    toast({
      title: "Asset Added",
      description: `${newAsset.name} has been successfully added.`,
    });
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:justify-start">
        <SidebarTrigger className="sm:hidden" />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assets</h1>
          <p className="text-muted-foreground hidden md:block">
            Manage your monitored assets.
          </p>
        </div>
        <div className="ml-auto">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Asset</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new asset to monitor.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <AddAssetForm
                  onSubmit={handleAddAsset}
                  onCancel={() => setIsDialogOpen(false)}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>All Assets</CardTitle>
            <CardDescription>A list of all monitored assets in your environment.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell>{asset.owner}</TableCell>
                    <TableCell>
                      <Badge variant={riskVariantMap[asset.risk]}>
                        {asset.risk}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
