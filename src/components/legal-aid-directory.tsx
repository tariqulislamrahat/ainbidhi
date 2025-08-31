"use client";

import { useState, useMemo } from 'react';
import { Landmark, Building, Mail, MapPin, Phone, Search, BookMarked, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { ngoData, govtServicesData } from '@/lib/data';
import { Separator } from './ui/separator';

const allServices = [
  ...ngoData.map(item => ({ ...item, category: 'NGO' as const })),
  ...govtServicesData.map(item => ({ ...item, category: 'Government' as const, specializations: [item.type] }))
];

const districts = [...new Set(allServices.map(service => service.location.district))].sort();
const specializations = [...new Set(allServices.flatMap(service => service.specializations))].sort();

export function LegalAidDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'NGO' | 'Government'>('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');

  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesDistrict = selectedDistrict === 'all' || service.location.district === selectedDistrict;
      const matchesSpecialization = selectedSpecialization === 'all' || service.specializations.includes(selectedSpecialization);
      return matchesSearch && matchesCategory && matchesDistrict && matchesSpecialization;
    });
  }, [searchTerm, selectedCategory, selectedDistrict, selectedSpecialization]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Landmark className="h-4 w-4" />
          <span className="sr-only">Legal Aid Directory</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Legal Aid Directory</SheetTitle>
          <SheetDescription>
            Find NGOs and Government legal aid services in Bangladesh.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 border-b bg-secondary/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="NGO">NGOs</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                </SelectContent>
              </Select>
               <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Filter by District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {districts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4">
               <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Filter by Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  {specializations.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
             <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name..." className="pl-9 bg-background" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {filteredServices.length > 0 ? filteredServices.map(service => (
              <Card key={service.id} className="overflow-hidden">
                <CardHeader className="p-4 bg-secondary/30 border-b">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {service.category === 'NGO' ? <Building className="h-6 w-6 text-primary flex-shrink-0" /> : <Landmark className="h-6 w-6 text-primary flex-shrink-0" />}
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold">{service.name}</CardTitle>
                      <CardDescription className="text-xs">{service.location.district}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 text-sm space-y-4">
                   <div className="space-y-3">
                     <div className="flex items-start gap-3 text-muted-foreground">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{(service.location as any).address ? `${(service.location as any).address}, ` : ''}{service.location.upazila}, {service.location.district}</span>
                     </div>
                     {service.contact.phone && (
                       <div className="flex items-start gap-3 text-muted-foreground">
                            <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <a href={`tel:${service.contact.phone}`} className="hover:underline">{service.contact.phone}</a>
                       </div>
                     )}
                     {(service.contact as any).email && (
                        <div className="flex items-start gap-3 text-muted-foreground">
                              <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <a href={`mailto:${(service.contact as any).email}`} className="hover:underline">{(service.contact as any).email}</a>
                        </div>
                     )}
                     {(service.contact as any).website && (
                        <div className="flex items-start gap-3 text-muted-foreground">
                              <BookMarked className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <a href={(service.contact as any).website} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{(service.contact as any).website}</a>
                        </div>
                     )}
                   </div>
                   <Separator />
                   <div>
                       <div className="flex flex-wrap gap-2">
                           <Badge variant={service.category === 'NGO' ? 'secondary' : 'default'}>{service.category}</Badge>
                           {service.specializations.map(spec => <Badge key={spec} variant="outline">{spec}</Badge>)}
                       </div>
                   </div>
                </CardContent>
              </Card>
            )) : (
                <div className="text-center py-10 text-muted-foreground flex flex-col items-center justify-center h-full">
                    <Info className="h-8 w-8 mb-2" />
                    <p className="font-medium">No Services Found</p>
                    <p className="text-xs">Try adjusting your search or filter criteria.</p>
                </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
