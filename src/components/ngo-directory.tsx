"use client";

import { useState, useMemo } from 'react';
import { Landmark, Building, Mail, MapPin, Phone, Search, BookMarked } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from './ui/badge';
import { ngoData, govtServicesData } from '@/lib/data';

const allServices = [
  ...ngoData.map(item => ({ ...item, category: 'NGO' as const })),
  ...govtServicesData.map(item => ({ ...item, category: 'Government' as const, specializations: [item.type] }))
];

const districts = [...new Set(allServices.map(service => service.location.district))];
const specializations = [...new Set(allServices.flatMap(service => service.specializations))];

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
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Landmark className="h-4 w-4" />
          <span className="sr-only">Legal Aid Directory</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] p-0">
        <SheetHeader className="p-6">
          <SheetTitle>Legal Aid Directory</SheetTitle>
          <SheetDescription>
            Find NGOs and Government legal aid services in Bangladesh.
          </SheetDescription>
        </SheetHeader>
        <div className="p-6 border-y">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="NGO">NGOs</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                </SelectContent>
              </Select>
               <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {districts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
               <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger>
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
                <Input placeholder="Search by name..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
        </div>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="p-6 space-y-4">
            {filteredServices.length > 0 ? filteredServices.map(service => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle className="text-base flex items-start gap-3">
                    {service.category === 'NGO' ? <Building className="h-5 w-5 text-primary mt-1 flex-shrink-0" /> : <Landmark className="h-5 w-5 text-primary mt-1 flex-shrink-0" />}
                    <span>{service.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                   <div className="flex items-start gap-3 text-muted-foreground">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{(service.location as any).address ? `${(service.location as any).address}, ` : ''}{service.location.upazila}, {service.location.district}</span>
                   </div>
                   {service.contact.phone && (
                     <div className="flex items-start gap-3 text-muted-foreground">
                          <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{service.contact.phone}</span>
                     </div>
                   )}
                   {(service.contact as any).email && (
                      <div className="flex items-start gap-3 text-muted-foreground">
                            <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{(service.contact as any).email}</span>
                      </div>
                   )}
                   {(service.contact as any).website && (
                      <div className="flex items-start gap-3 text-muted-foreground">
                            <BookMarked className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <a href={(service.contact as any).website} target="_blank" rel="noopener noreferrer" className="hover:underline">{(service.contact as any).website}</a>
                      </div>
                   )}
                   <div className="pt-2">
                       <div className="flex flex-wrap gap-2">
                           <Badge variant={service.category === 'NGO' ? 'secondary' : 'default'}>{service.category}</Badge>
                           {service.specializations.map(spec => <Badge key={spec} variant="outline">{spec}</Badge>)}
                       </div>
                   </div>
                </CardContent>
              </Card>
            )) : (
                <div className="text-center py-10 text-muted-foreground">
                    <p>No services found matching your criteria.</p>
                </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}