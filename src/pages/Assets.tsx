
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { assets, riskVariantMap } from "@/data/assets";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Assets() {
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
          <Button disabled>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Asset (soon)
          </Button>
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
