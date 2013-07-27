var url="https://knockknock.firebaseio.com";
var mainNode= new Firebase(url);
angular.module('chat', ['firebase'])
    .controller('Chat', ['$scope', '$timeout', 'angularFireCollection',
        function($scope, $timeout, angularFireCollection) {
            $scope.messages = angularFireCollection(mainNode);
            $scope.name = 'Guest' + Math.floor(Math.random()*101);
            $scope.addMessage = function() {
                var myDataRef = new Firebase(url+'/'+ $scope.name+$scope.text);

                myDataRef.setWithPriority({name: $scope.name, text: $scope.text},new Date().getTime());
                $scope.text = "";
            }
            $scope.drillIn = function(name,text) {

                url=url+'/'+name+text;
                mainNode=new Firebase(url);
                $scope.messages = angularFireCollection(mainNode);
            } 
            $scope.back = function() {

                url=mainNode.parent().toString()
                mainNode=new Firebase(url);
                $scope.messages = angularFireCollection(mainNode);
            }
            $scope.home = function() {

                           url="https://knockknock.firebaseio.com";
                           mainNode=new Firebase(url);
                           $scope.messages = angularFireCollection(mainNode);
                       }

        }
    ])
    .directive('autoScroll', function($timeout) {
        return function(scope, elements, attrs) {
            scope.$watch("messages.length", function() {
                $timeout(function() {
                    elements[0].scrollTop = elements[0].scrollHeight
                });
            });
        }
    });

  
  
