 public class AnimalComponent {
    
            @AuraEnabled
            public static List<Animal__c> getAnimalByExternalId(String externalId) {
                Integer extId = Integer.valueOf(externalId);
                System.debug(externalId);
                List<animal__c> result = [SELECT Id, Name, says__c, eats__c, extId__c 
                        FROM animal__c 
                        WHERE extId__c = :extId];
                
                return result;        
                
    }

    @AuraEnabled(cacheable=false)
    public static String createAnimals(String input) {
        List<Animal__c> animal = fillAnimalsFields(input);
        Database.SaveResult[] srList =  Database.insert(animal);
        List<Id> animalIds = new List<Id>();
        for (Database.SaveResult sr : srList) {
            animalIds.add(sr.getId());
        }
         input = 'Was successfully created animals!'; 
        return input;
    }

    private static List<Animal__c> fillAnimalsFields(String input) {
        List<Animal__c> result = new List<Animal__c>();
        AnimalInfo response = AnimalInfo.parse(input);
        for (AnimalInfo.Animal anim : response.animals) {
            Animal__c animal = new Animal__c();
            animal.Name = anim.name;
            animal.Eats__c = anim.eats;
            animal.Says__c = anim.says;
            animal.extId__c = anim.extId;
            result.add(animal);
        }
        return result;
    }

    private static List<Animal__c> animalCallout (List<Integer> animalId) {
        Map<Integer,Animal__c> animalMap = AnimalCallouts.getMapWitAnimals(animalId);
        List<Animal__c> result = new List<Animal__c>();
        for(Integer exId : animalMap.keySet()) {
            Animal__c animal = animalMap.get(exId);
            if (animal.Eats__c.length() != 0 && animal.Says__c.length() != 0 && animal.name.length() != 0) {
                animal.extId__c = exId;
                result.add(animal);
            }
        }
        return result;
    }
    @AuraEnabled(cacheable=true)
    public static List<Animal__c> getAnimalFromWebSirvice(Integer minExtId, Integer maxExtId) {
        List<Integer> externalId = new List<Integer>();
        for(Integer i = minExtId; i < maxExtId; i++) {
            externalId.add(i);
        }
        return animalCallout(externalId);
    }
}
